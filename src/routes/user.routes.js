import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import {
  deleteUserByIdController,
  updateUserByIdController,
  userController,
} from "../controllers/index.js";

export const userRouter = new Router();

userRouter.post("/profile", authGuard, userController);
userRouter.put(
  "/:id",
  authGuard,
  roleGuard(["supeAdmin"]),
  updateUserByIdController
);
userRouter.delete(
  "/:id",
  authGuard,
  roleGuard(["superAdmin"]),
  deleteUserByIdController
);
