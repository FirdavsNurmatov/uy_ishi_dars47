import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import { createCategoryCon, deleteByIdCategoryCon, getAllCategories, getCategoryById, updateCategoryByIdCon } from "../controllers/index.js";

export const categoryRouter = new Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post(
  "/",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  createCategoryCon
);
categoryRouter.put(
  "/:id",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  updateCategoryByIdCon
);
categoryRouter.delete(
  "/:id",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  deleteByIdCategoryCon
);
