import { logger } from "../utils/index.js";
import {
  loginService,
  refreshService,
  registerService,
  verifyService,
} from "../services/index.js";
import { ApiError } from "../utils/index.js";

export const registerController = async function (req, res, next) {
  try {
    const result = await registerService(req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const loginController = async function (req, res, next) {
  try {
    const result = await loginService(req.body);

    return res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const result = await refreshService(req.body);

    return res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const verifyController = async (req, res, next) => {
  try {
    const result = await verifyService(req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};
