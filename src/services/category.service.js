import { Category } from "../modules/index.js";
import { statusCodes, ApiError } from "../utils/index.js";

export const getAllCategoriesService = async (page, limit) => {
  try {
    const skipPage = (page - 1) * limit;
    const categories = Category.find().skip(skipPage).limit(limit);

    if (!categories) {
      return {
        status: statusCodes.NOT_FOUND,
        message: "Not found!",
      };
    }

    return {
      status: statusCodes.OK,
      message: categories,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCategoryByIdService = async function (id) {
  try {
    const oneCategoryData = await Category.findById(id);

    if (oneCategoryData) return { oneCategoryData };

    return { status: statusCodes.NOT_FOUND, message: "Not found!" };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createCategoryService = async (data) => {
  try {
    const newCategory = new Category(data);
    await newCategory.save();

    return {
      status: statusCodes.CREATED,
      message: "Created",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCategoryService = async (id, newCategory) => {
  try {
    const result = await Category.findById(id);

    if (!result)
      return { status: statusCodes.NOT_FOUND, message: "Not found!" };

    const updatedData = {
      name: name || result.name,
      description: description || result.description,
    };

    await Category.findByIdAndUpdate(id, updatedData);

    return {
      status: statusCodes.OK,
      message: "Updated",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteCategoryService = async (id) => {
  try {
    await Category.findByIdAndDelete(id);

    return {
      status: statusCodes.OK,
      message: "Deleted",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
