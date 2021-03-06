import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";
import "./database";
import "./shared/container";
import { AppError } from "./errors/AppError";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use(authenticateRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
    next();
  }
);

app.listen(3333, () => console.log("Server is running!"));
