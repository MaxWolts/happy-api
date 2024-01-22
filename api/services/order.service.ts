import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import type { Pool } from "pg";

const { models } = sequelize;

type OrderBody = {
  name: string;
  userId: string;
};

export class OrderService {
  pool: Pool;
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err: Error) => console.log(err));
  }
  async create(body: OrderBody) {
    const newOrderUser = await models.Order.create(body);
    return newOrderUser;
  }

  async find() {
    const orders = await models.Order.findAll();
    if (!orders) {
      throw boom.notFound("orders not found");
    }
    return orders;
  }

  // async findOne(id) {
  //   return { id };
  // }

  // async update(id, changes) {
  //   return {
  //     id,
  //     changes,
  //   };
  // }

  // async delete(id) {
  //   return { id };
  // }

};
