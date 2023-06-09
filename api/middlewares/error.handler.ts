import type { NextFunction, Request, Response } from "express";
import { Boom } from "@hapi/boom";
import { ValidationError } from "sequelize";

export const logErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  next(err);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

export const boomErrorHandler = (
  err: Error | Boom,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Boom) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    }
  } else {
    next(err);
  }
};

export const ormErrorHandle = (
  err: Error | Boom,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
};
