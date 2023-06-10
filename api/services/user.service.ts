import boom from "@hapi/boom";
import type { Pool } from "pg";
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
    const query = "SELECT * FROM users";
    const rta = await this.pool.query(query);
    return rta.rows;
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
