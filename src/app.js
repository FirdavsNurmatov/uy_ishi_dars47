import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import {
  authRouter,
  articleRouter,
  blogRouter,
  userRouter,
  categoryRouter,
  commentRouter,
  courseRouter,
  forgetRouter,
} from "./routes/index.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/article", articleRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/forget", forgetRouter)

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(err.message);
  }
});

export default app;
