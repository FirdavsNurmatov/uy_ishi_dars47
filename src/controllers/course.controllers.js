import { logger } from "../utils/index.js";
import { ApiError } from "../utils/index.js";
import {
  createCourseService,
  deleteCourseService,
  getAllCoursesService,
  updateCourseService,
} from "../services/course.service.js";

export const getAllCourses = async function (req, res, next) {
  try {
    const allData = await getAllCoursesService(
      req.query?.page,
      req.query?.limit
    );

    res.send(allData);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCourseById = async function (req, res, next) {
  try {
    const courseId = req.params.id;

    const result = await getCourseByIdService(courseId);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createCourse = async function (req, res, next) {
  try {
    const result = await createCourseService(req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCourseById = async function (req, res, next) {
  try {
    const courseId = req.params.id;

    const result = await updateCourseService(courseId, req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteCourseById = async function (req, res, next) {
  try {
    const courseId = req.params.id;

    const result = await deleteCourseService(courseId);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};
