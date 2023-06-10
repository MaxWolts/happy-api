import boom from "@hapi/boom";
import type { Pool } from "pg";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";

export class UserService {
  pool: Pool;
  constructor() {
    this.pool = pool;
  }

  async create(data: any) {
    return data;
  }

  async find() {
    const rta = await sequelize.models.User.findAll();
    return rta;
  }

  async findOne(id: any) {
    return { id };
  }

  async update(id: any, changes: any) {
    return {
      id,
      changes,
    };
  }

  async delete(id: any) {
    return { id };
  }
}
