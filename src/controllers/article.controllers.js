import { logger } from "../utils/index.js";
import { ApiError } from "../utils/index.js";
import {
  createArticleService,
  deleteArticleService,
  getAllArticlesService,
  getArticleByIdService,
  updateArticleService,
} from "../services/article.service.js";

export const getAllArticles = async function (req, res, next) {
  try {
    const allData = await getAllArticlesService(
      req.query?.page,
      req.query?.limit
    );

    res.send(allData);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getArticleById = async function (req, res, next) {
  try {
    const articleId = req.params.id;
    const oneArticleData = await getArticleByIdService(articleId);

    res.send(oneArticleData);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createArticle = async function (req, res, next) {
  try {
    const result = await createArticleService(req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateArticleById = async function (req, res, next) {
  try {
    const articleId = req.params.id;

    const result = await updateArticleService(articleId, req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteArticleById = async function (req, res, next) {
  try {
    const articleId = req.params.id;

    const result = await deleteArticleService(articleId);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};
