import { Course } from "../modules/index.js";
import { statusCodes, ApiError } from "../utils/index.js";

export const getAllCoursesService = async (page = 1, limit = 3) => {
  try {
    const skipPage = (page - 1) * limit;
    const courses = await Course.find().skip(skipPage).limit(limit);

    if (!courses) {
      return {
        status: statusCodes.NOT_FOUND,
        message: "Not found!",
      };
    }

    return {
      status: statusCodes.OK,
      message: courses,
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCourseByIdService = async function (id) {
  try {
    const oneCourseData = await Course.findById(id);

    if (oneCourseData) return { message: oneCourseData };

    return { status: statusCodes.NOT_FOUND, message: "Not found!" };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createCourseService = async (data) => {
  try {
    const newCourse = {
      name: data?.name,
      category_id: data?.category_id,
      description: data?.description,
    };

    const course = new Course(newCourse);
    await course.save();

    return {
      status: statusCodes.OK,
      message: "Created",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCourseService = async (id, data) => {
  try {
    const { name, category_id, description } = data;

    const result = await Course.findById(id);

    if (!result)
      return { status: statusCodes.NOT_FOUND, message: "Not found!" };

    const updatedData = {
      name: name || result.name,
      category_id: category_id || result.category_id,
      description: description || result.description,
    };

    await Course.findByIdAndUpdate(id, updatedData);

    return {
      status: statusCodes.OK,
      message: "Updated",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteCourseService = async (id) => {
  try {
    await Course.findByIdAndDelete(id);

    return {
      status: statusCodes.OK,
      message: "Deleted",
    };
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
