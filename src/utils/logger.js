import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";
import { createLogger, format, transports } from "winston";
import "winston-mongodb";

import { config } from "dotenv";
config()

const logtail = new Logtail(process.env.LOGGER_TOKEN)

export const logger = createLogger({
  level: "silly",
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.colorize({ all: true })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "application.log" }),
    new LogtailTransport(logtail),
    // new transports.MongoDB({
    //   level: "error",
    //   db: process.env.MONGO_URI,
    //   collection: "error_logs",
    // }),
  ],
});
