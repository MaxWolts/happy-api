import express from "express";
import { OrderService } from "../services/order.service";
import { validatorHandler } from "../middlewares/validator.handler";
import { createOrderSchema, getOrderSchema, getOrdersByUserSchema } from "../schemas/order.schema";

export const router = express.Router();
const services = new OrderService();


router.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json(services.find());
  } else {
    res.json(await services.find());
  }
});
