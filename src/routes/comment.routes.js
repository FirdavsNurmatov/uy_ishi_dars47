import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import { createComment, deleteCommentById, getAllComments, getCommentById, updateCommentById } from "../controllers/index.js";

export const commentRouter = new Router();

commentRouter.get("/", getAllComments);
commentRouter.get("/:id", getCommentById);
commentRouter.post(
  "/",
  authGuard,
  createComment
);
commentRouter.put(
  "/:id",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  updateCommentById
);
commentRouter.delete(
  "/:id",
  authGuard,
  roleGuard(["admin", "superAdmin"]),
  deleteCommentById
);
