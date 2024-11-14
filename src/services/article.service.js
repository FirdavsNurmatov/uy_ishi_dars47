import { Article } from "../modules/index.js";
import { statusCodes, ApiError } from "../utils/index.js";

export const getAllArticlesService = async (page = 1, limit = 3) => {
  try {
    const skipPage = (page - 1) * limit;
    const articles = Article.find().skip(skipPage).limit(limit);

    if (!articles) {
      return {
        status: statusCodes.NOT_FOUND,
        message: "Not found!",
      };
    }

    return {
      status: statusCodes.OK,
      message: articles,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getArticleByIdService = async (id) => {
  try {
    const result = await Article.findById(id);

    return {
      status: statusCodes.OK,
      message: result,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createArticleService = async (data) => {
  try {
    const newArticle = new Article({
      content: data?.content,
      author_id: data?.author_id,
      category_id: data?.category_id,
      course_id: data?.course_id,
    });
    await newArticle.save();

    return {
      status: statusCodes.CREATED,
      message: "Created",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateArticleService = async (id, data) => {
  try {
    const { content, author_id, category_id, course_id } = data;

    const result = await Article.findById(id);

    if (!result)
      return { status: statusCodes.NOT_FOUND, message: "Not found!" };

    const updatedData = {
      content: content || result.content,
      author_id: author_id || result.author_id,
      category_id: category_id || result.category_id,
      course_id: course_id || result.course_id,
    }

    await Article.findByIdAndUpdate(id, updatedData);

    return {
      status: statusCodes.OK,
      message: "Updated",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteArticleService = async (id) => {
  try {
    await Article.findByIdAndDelete(id);

    return {
      status: statusCodes.OK,
      message: `Deleted`,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
