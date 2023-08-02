import boom from "@hapi/boom";
import {pool} from '../libs/postgres.pool'
import type { Pool } from "pg";

export class CategoryService {
  pool: Pool;
  constructor() {
    this.pool = pool;
  }
  // async create(data) {
  //   return data;
  // }

  // async find() {
  //   return [];
  // }

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
