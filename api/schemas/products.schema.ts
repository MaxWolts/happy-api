import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const description = Joi.string().max(30);
const categoryId = Joi.number().integer();
const productId = Joi.number().integer();
const price = Joi.number().integer().min(2);
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  category: categoryId.required(),
  description: description.required(),
  price: price.required(),
  image: image.required(),
});
const addCategorySchema = Joi.object({
  categoryId: categoryId.required(),
  productId: productId.required(),
});
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
});
const getProductSchema = Joi.object({
  id: id.required(),
});

export {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  addCategorySchema,
};
