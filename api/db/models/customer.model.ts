import { Model, DataTypes, Sequelize } from "sequelize";
import { USER_TABLE } from "./user.model";

const CUSTOMER_TABLE = "customers";

const CustomerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "last_name",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.fn("NOW"),
  },
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class Customer extends Model {
  static associate({ models }: Sequelize) {
    this.belongsTo(models.User, { as: "user" });
  }
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: "Customer",
      timestamps: false,
    };
  }
}

export { Customer, CustomerSchema, CUSTOMER_TABLE };
