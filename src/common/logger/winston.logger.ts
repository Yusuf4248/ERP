import * as winston from "winston";
import { utilities as nestWinstonModuleUtilities } from "nest-winston";

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.label({ label: "ERP" }),
        // nestWinstonModuleUtilities.format.nestLike("Prismajon"),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, label, timestamp }) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: "logs/combine.log",
      level: "info",
      format: winston.format.combine(
        winston.format.label({ label: "ERP" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.label({ label: "ERP" }),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
};
