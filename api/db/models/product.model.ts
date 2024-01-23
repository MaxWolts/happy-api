import { Model, Sequelize, DataTypes } from "sequelize";

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
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: "",
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
};
class Product extends Model {
  static associate(sequelize: Sequelize) {
    this.belongsToMany(sequelize.models.Category, {
      as: "categories",
      through: sequelize.models.ProductCategory,
      foreignKey: "productId",
      otherKey: "categoryId",
    });
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
