import boom from "@hapi/boom";
import { sequelize } from "../libs/sequelize";

const { models } = sequelize;
type CategoryData = {
  name?: string;
  image?: string;
};

export class CategoryService {
  async find() {
    const rta = await models.Category.findAll({
      include: ["products"],
    });
    return rta;
  }

  async findOne(id: string) {
    const category = await models.Category.findByPk(id, {
      include: ["products"],
    });
    if (!category) {
      throw boom.notFound("category not found");
    }
    return category;
  }

  async create(data: CategoryData) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async update(id: string, changes: CategoryData) {
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
