import Joi from "joi";

const id = Joi.number().integer();
const user_id = Joi.number().integer();
const productsSchema = Joi.object({
  id: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
});
const products = Joi.array().items(productsSchema);

const createOrderSchema = Joi.object({
  user_id: user_id.required(),
  products: products.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});
const getOrdersByUserSchema = Joi.object({
  user_id: user_id.required(),
});

export { createOrderSchema, getOrderSchema, getOrdersByUserSchema };
