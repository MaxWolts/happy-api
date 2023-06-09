import express from "express";
import { router as productsRouter } from "./products.router";
import { router as usersRouter } from "./users.router";
import type { Express } from "express";

export const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/users", usersRouter);
};
