import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import type { Pool } from "pg";

const { models } = sequelize;

type Product = {
  name: string;
  price: number;
  description: string;
  image: string;
  categories: string[];
};
type ProductEdit = {
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  categories?: string[];
};
type CategoryData = {
  productId: string;
  category: string;
}
export class ProductsService {
  products: Product[];
  pool: Pool;
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }
  async create(data: Product) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async addCategory(data: CategoryData) {
    const newCategory = await models.ProductCategory.create(data);
    return newCategory;
  }
  async getProductCategory() {
    const newProductCategory = await models.ProductCategory.findAll();
    return newProductCategory;
  }
  async find() {
    const products = await models.Product.findAll({
      include: ["categories"],
    });
    return products;
  }
  async findOne(id: string) {
    const product = await models.Product.findByPk(id, {
      include: ["categories"],
    });
    if (!product) {
      throw boom.notFound("product not found");
    }
    return product;
  }
  async update(id: string, changes: ProductEdit) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }
  async delete(id: string) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }
}
