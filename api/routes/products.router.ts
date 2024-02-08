import express from "express";
import { ProductsService } from "../services/products.service";
import { validatorHandler } from "../middlewares/validator.handler";
import { checkApiKey } from "../middlewares/auth.handler";
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  addCategorySchema,
  queryProductSchema,
} from "../schemas/products.schema";

export const router = express.Router();
const services = new ProductsService();

router.get(
  "/",
  checkApiKey,
  validatorHandler(queryProductSchema, "query"),
  async (req, res, next) => {
    try {
      const products = await services.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/add-category",
  validatorHandler(addCategorySchema),
  async (req, res, next) => {
    try {
      const productCategory = await services.getProductCategory();
      res.json(productCategory);
    } catch (error) {
      next(error);
    }
  }
);

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

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await services.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-category",
  validatorHandler(addCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await services.addCategory(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res) => {
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
