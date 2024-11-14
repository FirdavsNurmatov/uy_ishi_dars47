import { logger } from "../utils/index.js";
import {
  deleteUserByIdService,
  updateUserByIdService,
} from "../services/user.service.js";

export const userController = function (req, res, next) {
  try {
    const currentUser = req.user;

    return res.send(currentUser);
  } catch (error) {
    logger.error(error)
    next(error);
  }
};

export const updateUserByIdController = async function (req, res, next) {
  try {
    const result = await updateUserByIdService(req.params?.id, req.body);

    return res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteUserByIdController = async function (req, res, next) {
  try {
    const result = await deleteUserByIdService(req.params.id);

    return res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};
