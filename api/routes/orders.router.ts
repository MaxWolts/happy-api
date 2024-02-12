import express from "express";
import passport from "passport";
import { checkRoles } from "../middlewares/auth.handler";
import { OrderService } from "../services/order.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createOrderSchema,
  getOrderSchema,
  addItemSchema,
} from "../schemas/order.schema";

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
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["customer", "admin"]),
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await services.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["customer", "admin"]),
  validatorHandler(createOrderSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await services.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/add-item",
  passport.authenticate("jwt", { session: false }),
  checkRoles(["customer", "admin"]),
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await services.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);
