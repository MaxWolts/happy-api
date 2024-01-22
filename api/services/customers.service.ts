import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";

const { models } = sequelize;
type CustomerData = {
  name?: string;
  lastName?: string;
  user?: {
    email?: string;
    password?: string;
  };
};

export class CustomerService {
  async find() {
    const rta = await models.Customer.findAll({
      include: ["user"],
    });
    return rta;
  }

  async findOne(id: string) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async create(data: CustomerData) {
    const newCustomer = await models.Customer.create(data, {
      include: ["user"],
    });
    return newCustomer;
  }

  async update(id: string, changes: CustomerData) {
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
