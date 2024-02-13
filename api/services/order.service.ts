import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import { pool } from "../libs/postgres.pool";
import type { Pool } from "pg";

const { models } = sequelize;

type ItemData = {
  orderId: string;
  productId: string;
  amount: string;
};

export class OrderService {
  pool: Pool;
  constructor() {
    this.pool = pool;
    this.pool.on("error", (err: Error) => console.log(err));
  }

  async create(id: string) {
    const customer: any = await models.Customer.findOne({
      where: { "$user.id$": id },
      include: [{ association: "user" }],
    });
    const customerId = customer.id;
    const newOrder = await models.Order.create({ customerId: customerId });
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    if (!orders) {
      throw boom.notFound("orders not found");
    }
    return orders;
  }

  async findOne(id: string) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: "customer", include: ["user"] }, "items"],
    });
    return order;
  }

  async findByUser(id: string) {
    console.log("id---", id);

    const order = await models.Order.findAll({
      where: {
        "$customer.user.id$": id,
      },
      include: [{ association: "customer", include: ["user"] }],
    });
    return order;
  }

  async addItem(data: ItemData) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  // async update(id, changes) {
  //   return {
  //     id,
  //     changes,
  //   };
  // }

  // async delete(id) {
  //   return { id };
  // }
}
