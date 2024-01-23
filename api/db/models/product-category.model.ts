import { Model, Sequelize, DataTypes } from "sequelize";

import { CATEGORY_TABLE } from "./category.model";
import { PRODUCT_TABLE } from "./product.model";

const PRODUCT_CATEGORY_TABLE = "products_categories";

const ProductCategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.fn("NOW"),
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
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class ProductCategory extends Model {
  static associate(sequelize: Sequelize) {
    //
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_CATEGORY_TABLE,
      modelName: "ProductCategory",
      timestamps: false,
    };
  }
}

export { ProductCategory, ProductCategorySchema, PRODUCT_CATEGORY_TABLE };
