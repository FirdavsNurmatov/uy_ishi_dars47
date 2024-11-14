import { Comment } from "../modules/index.js";
import { statusCodes, ApiError } from "../utils/index.js";

export const getAllComentsService = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const comments = await Comment.find().skip(skip).limit(limit);

    if (!comments) {
      return {
        status: statusCodes.NOT_FOUND,
        message: "This user hasn't any comment!",
      };
    }

    return {
      status: statusCodes.OK,
      message: comments,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getMyCommentByIdService = async (userId, page = 1, limit = 3) => {
  try {
    const skipPage = (page - 1) * limit;
    const comments = await Comment.find({ userId: userId })
      .skip(skipPage)
      .limit(limit);

    if (!comments) {
      return {
        status: statusCodes.NOT_FOUND,
        message: "You hadn't any comment yet",
      };
    }

    return {
      status: statusCodes.OK,
      message: comments,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createComentService = async (data) => {
  try {
    const comment = {
      content: data?.content,
      article_id: data?.article_id,
      user_id: data?.user_id,
      course_id: data?.course_id,
    };

    const newComment = new Comment(comment);
    await newComment.save();

    return {
      status: statusCodes.CREATED,
      message: "Created",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCommentService = async (id, data) => {
  try {
    const result = await Comment.findById(id);

    if (!result)
      return { status: statusCodes.NOT_FOUND, message: "Not found!" };

    const { content, article_id, user_id, course_id } = data;

    const updatedData = {
      content: content || result.content,
      article_id: article_id || result.article_id,
      user_id: user_id || result.user_id,
      course_id: course_id || result.course_id,
    };

    await Comment.findByIdAndUpdate(id, updatedData);

    return {
      status: statusCodes.OK,
      message: "Updated",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteComentByIdService = async (id) => {
  try {
    await Comment.findByIdAndDelete(id);

    return {
      status: statusCodes.OK,
      message: "Coment muvaffaqiyatli o'chirildi",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
