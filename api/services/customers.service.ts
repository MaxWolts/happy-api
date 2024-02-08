import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";
import bcryptjs from "bcryptjs";

const { models } = sequelize;
type CustomerData = {
  name: string;
  lastName: string;
  user: {
    email: string;
    password: string;
  };
};
type CustomerDataEdit = {
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
      include: [
        {
          association: "user",
          attributes: { exclude: ["createdAt", "updatedAt", "password"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    return rta;
  }

  async findOne(id: string) {
    const customer = await models.Customer.findByPk(id, {
      include: [{ association: "user", attributes: { exclude: ["password"] } }],
    });
    if (!customer) {
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async create(data: CustomerData) {
    const hash = await bcryptjs.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    const newCustomer = await models.Customer.create(newData, {
      include: [{ association: "user", attributes: { exclude: ["password"] } }],
    });

    return newCustomer;
  }

  async update(id: string, changes: CustomerDataEdit) {
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
