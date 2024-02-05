import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import type { Pool } from "pg";
import type { Request } from "express";

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
  categoryId: string;
};
type Limit = number | undefined;
type Offset = number | undefined;
type Query = {
  limit: Limit;
  offset: Offset;
};
export class ProductsService {
  products: Product[];
  pool: Pool;
  constructor() {
    this.products = [];
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }
  // async create(data: Product) {
  //   const newProduct: any = await models.Product.create(data);
  //   data.categories.forEach(async (element) => {
  //     await this.addCategory({ productId: newProduct.id, categoryId: element });
  //   });
  //   return await this.findOne(newProduct.id);
  // }
  async create(data: Product) {
    const newProduct: any = await models.Product.create(data);
    for (const categoryId of data.categories) {
      await this.addCategory({ productId: newProduct.id, categoryId });
    }
    return await this.findOne(newProduct.id);
  }
  // data.categories.forEach(async (element) => {
  //   await this.addCategory({ productId: newProduct.id, categoryId: element });
  // });
  // return await this.findOne(newProduct.id);
  async addCategory(data: CategoryData) {
    const newCategory = await models.ProductCategory.create(data);
    return newCategory;
  }
  async getProductCategory() {
    const newProductCategory = await models.ProductCategory.findAll();
    return newProductCategory;
  }
  async find(query?: any) {
    const { limit, offset } = query;
    const options: { include: string[]; limit?: Limit; offset?: Offset } = {
      include: ["categories"],
    };
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    const products = await models.Product.findAll(options);
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
