import boom from "@hapi/boom";
import type { NextFunction, Request, Response } from "express";
import { config } from "../config/config";

const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["api"];
  if (apiKey === config.apikey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

export { checkApiKey };
