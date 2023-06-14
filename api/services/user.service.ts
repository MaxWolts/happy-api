import boom from "@hapi/boom";
import type { Pool } from "pg";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import { UniqueConstraintError } from "sequelize"
import type { Request } from "express";
type UserBody = {
  email: string;
  password: string;
};

const { models } = sequelize;

export class UserService {
  pool: Pool;
  constructor() {
    this.pool = pool;
  }

  async create(body: UserBody) {
    const newUser = await models.User.create(body);
    return newUser;
  }

  async find() {
    const users = await models.User.findAll();
    if (!users) {
      throw boom.notFound("users not found");
    }
    return users;
  }

  async findOne(id: string) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("user not found");
    }
    return user;
  }

  async update(id: string, changes: Request) {
    const user = await this.findOne(id);
    const rta = await user.update(changes.body);
    return rta;
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}
