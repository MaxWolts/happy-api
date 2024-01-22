import express from "express";
import { CustomerService } from "../services/customers.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema,
} from "../schemas/customer.schema";

const router = express.Router();
const service = new CustomerService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCustomer = await service.create(body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id);
      res.status(201).json({ deleted });
    } catch (error) {
      next(error);
    }
  }
);

export { router };
