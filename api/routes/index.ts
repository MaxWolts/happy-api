import express from "express";
import { router as productsRouter } from "./products.router";
import { router as usersRouter } from "./users.router";
import { router as orderRouter } from "./orders.router";
import type { Express } from "express";

export const routerApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/products", productsRouter);
  router.use("/orders", orderRouter);
  router.use("/users", usersRouter);
};
