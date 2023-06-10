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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.fn("NOW")
  },
};

class Category extends Model {
  static associate(sequelize: Sequelize) {
    this.hasMany(sequelize.models.Item, {
      as: "products",
      foreignKey: "categoryId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false
    }
  }
}

export { CATEGORY_TABLE, CategorySchema, Category }
