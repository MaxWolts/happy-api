import { Model, DataTypes, Sequelize } from "sequelize";

const CATEGORY_TABLE = "categories";

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.fn("NOW"),
  },
};

class Category extends Model {
  static associate(sequelize: Sequelize) {
    this.belongsToMany(sequelize.models.Product, {
      as: "products",
      through: sequelize.models.ProductCategory,
      foreignKey: "categoryId",
      otherKey: "productId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false,
    };
  }
}

export { CATEGORY_TABLE, CategorySchema, Category };
