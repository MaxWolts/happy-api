import { Model, DataTypes, Sequelize } from "sequelize";
import { CUSTOMER_TABLE } from "./customer.model";

const ORDER_TABLE = "orders";

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: "customer_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: "id",
    },
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
    this.belongsTo(sequelize.models.Customer, {
      as: "customer",
    });
    this.belongsToMany(sequelize.models.Product, {
      as: "items",
      through: sequelize.models.OrderProduct,
      foreignKey: "orderId",
      otherKey: "productId",
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

export { ORDER_TABLE, OrderSchema, Order };
