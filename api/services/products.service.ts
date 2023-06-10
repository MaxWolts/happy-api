import boom from "@hapi/boom";
import type { Pool } from "pg";
import { pool } from "../libs/postgres.pool";

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
  async create() {}
  async find() {
    const query = "SELECT * FROM products";
    const rta = await this.pool.query(query);
    return rta.rows;
  }
  async findOne(id: string) {
    const product = this.products.filter((product) => product.id === id);
    if (product.length) {
      return product;
    } else {
      console.log('u');

      throw boom.notFound("product not found");
    }
  }
  async update() {}
  async delete() {}
}
