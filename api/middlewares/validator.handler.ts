import boom from "@hapi/boom";
import type { NextFunction, Request, Response } from "express";
import type { Schema } from "joi";

function validatorHandler(schema: Schema, property: keyof Request = "body") {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
};

export { validatorHandler };
