import { logger } from "../utils/index.js";
import {
  createCategoryService,
  deleteCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} from "../services/category.service.js";
import { ApiError } from "../utils/index.js";

export const getAllCategories = async function (req, res, next) {
  try {
    const allData = await getAllCategoriesService(
      req.query?.page,
      req.query?.limit
    );

    res.send(allData);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const getCategoryById = async function (req, res, next) {
  try {
    const result = await getCategoryByIdService(req.params.id);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const createCategoryCon = async function (req, res, next) {
  try {
    const newCategory = {
      name: req.body.name,
      description: req.body.description,
    };
    const result = await createCategoryService(newCategory);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateCategoryByIdCon = async function (req, res, next) {
  try {
    const categoryId = req.params.id;

    const result = await updateCategoryService(categoryId, req.body);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};

export const deleteByIdCategoryCon = async function (req, res, next) {
  try {
    const categoryId = req.params.id;

    const result = await deleteCategoryService(categoryId);

    res.send(result);
  } catch (error) {
    logger.error(error)
    next(new ApiError(error.statusCode, error.message));
  }
};
