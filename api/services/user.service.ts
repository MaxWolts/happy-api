import boom from "@hapi/boom";
import type { Pool } from "pg";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import type { Request } from "express";
import bcryptjs from "bcryptjs";

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
    const hash = await bcryptjs.hash(body.password, 10);
    const newUser = await models.User.create({
      ...body,
      password: hash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      include: ["customer"],
    });
    if (!users) {
      throw boom.notFound("users not found");
    }
    return users;
  }

  async findByEmail(email: string) {
    const rta = await models.User.findOne({
      where: { email },
    });
    if (!rta) {
      throw boom.notFound("users not found");
    }
    return rta;
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
