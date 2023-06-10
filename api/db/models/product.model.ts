import { Model, Sequelize, DataTypes } from "sequelize";
import { CATEGORY_TABLE } from "./category.model";

const PRODUCT_TABLE = "products";

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: "",
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  categoryId: {
    field: "category_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};
class Product extends Model {
  static associate(sequelize: Sequelize) {
    this.belongsTo(sequelize.models.Category, { as: "category" });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

export { PRODUCT_TABLE, ProductSchema, Product };
