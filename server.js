import app from "./src/app.js";
import { connectMongodb } from "./src/database/index.js";
import { logger } from "./src/utils/index.js";

// Error handling
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err);
  process.exit(1);
});

process.on("unhandleRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

const startApp = async () => {
  try {
    await connectMongodb();
    app.listen(3000, () => {
      logger.info(`Server started on port  ${3000}`);
    });
  } catch (error) {
    logger.error(error.message);
  }
};

startApp();
