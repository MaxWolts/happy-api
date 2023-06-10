import { Model, DataTypes, Sequelize } from "sequelize";

const ORDER_TABLE = "orders";

const OrderSchema = {
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.fn("NOW"),
  },
};

class Order extends Model {
  static associate(sequelize: Sequelize) {
    this.hasMany(sequelize.models.Product, {
      as: "products",
      foreignKey: "categoryId",
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}

export { ORDER_TABLE, OrderSchema, Order }
