import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import type { Pool } from "pg";

const { models } = sequelize;

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
};

export class ProductsService {
  products: Product[];
  pool: Pool;
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }
  async create(data: Product) {
    const newProduct = await models.Customer.create(data);
    return newProduct;
  }
  async find() {
    const query = "SELECT * FROM products";
    const [data] = await sequelize.query(query);
    return data;
  }
  async findOne(id: string) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    return product;
  }
  // async update() {}
  // async delete() {}
}
