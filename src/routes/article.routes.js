import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import { createArticle, deleteArticleById, getAllArticles, getArticleById, updateArticleById } from "../controllers/index.js";

export const articleRouter = new Router();

articleRouter.get("/", getAllArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post(
  "/",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  createArticle
);
articleRouter.put(
  "/:id",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  updateArticleById
);
articleRouter.delete(
  "/:id",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  deleteArticleById
);
