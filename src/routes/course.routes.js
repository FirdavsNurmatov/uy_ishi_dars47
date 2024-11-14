import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import { createCourse, deleteCourseById, getAllCourses, getCourseById, updateCourseById } from "../controllers/index.js";

export const courseRouter = new Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.post(
  "/",
  authGuard,
  roleGuard(["superAdmin"]),
  createCourse
);
courseRouter.put(
  "/:id",
  authGuard,
  roleGuard(["superAdmin"]),
  updateCourseById
);
courseRouter.delete(
  "/:id",
  authGuard,
  roleGuard(["superAdmin"]),
  deleteCourseById
);
