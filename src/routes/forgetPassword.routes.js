import { Router } from "express";
import { forgetPasswordController, forgetPasswordControllerAndUpdateController } from "../controllers/index.js";

export const forgetRouter = new Router();

forgetRouter.put("/password/:token", forgetPasswordControllerAndUpdateController);
forgetRouter.post("/password", forgetPasswordController);
