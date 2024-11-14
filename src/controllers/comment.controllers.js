import { logger } from "../utils/index.js";
import { ApiError } from "../utils/index.js";
import { getCategoryByIdService } from "../services/category.service.js";
import {
  deleteComentByIdService,
  getAllComentsService,
} from "../services/comments.service.js";

export const getAllComments = async function (req, res, next) {
  try {
    const allData = await getAllComentsService();

    res.send(allData);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCommentById = async function (req, res, next) {
  try {
    const commentId = req.params.id;
    const oneCommentData = await getCategoryByIdService(
      commentId,
      req.query?.page,
      req.query?.limit
    );

    res.send(oneCommentData);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createComment = async function (req, res, next) {
  try {
    const result = await createCommentService(req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCommentById = async function (req, res, next) {
  try {
    const commentId = req.params.id;

    const result = await updateCategoryService(commentId, req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteCommentById = async function (req, res, next) {
  try {
    const commentId = req.params.id;

    const result = await deleteComentByIdService(commentId);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};
