import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import {pool} from '../libs/postgres.pool'
import type { Pool } from "pg";

const { models } = sequelize;

export class OrderService {
  pool: Pool;
  constructor(){
    this.pool = pool;
    this.pool.on('error', (err: Error) => console.log(err));
  }
  // async create(data) {
  //   return data;
  // }

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
