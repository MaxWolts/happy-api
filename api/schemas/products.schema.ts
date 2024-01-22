import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const description = Joi.string().max(30);
const category = Joi.array().items(Joi.string().max(20)).max(20);
const price = Joi.number().integer().min(2);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  category: category.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
});
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  category: category,
  description: description,
});
const getProductSchema = Joi.object({
  id: id.required(),
});

export { createProductSchema, updateProductSchema, getProductSchema };
