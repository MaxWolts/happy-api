import express from "express";
import { ProductsService } from "../services/products.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} from "../schemas/products.schema";

export const router = express.Router();
const services = new ProductsService();

router.get("/", async (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json(services.find());
  } else {
    res.json(await services.find());
  }
});
router.get("/filter", (req, res) => {
  res.send("soy un filter");
});
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.json(await services.findOne(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", validatorHandler(createProductSchema, "body"), (req, res) => {
  const body = req.body;
  res.json({
    message: "created",
    data: body,
  });
});

router.patch(
  "/",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  (req, res) => {
    const body = req.body;
    res.json({
      message: "updated",
      data: body,
    });
  }
);

router.delete(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  (req, res) => {
    const id = req.params;
    res.json({
      message: "updated",
      data: id,
    });
  }
);
