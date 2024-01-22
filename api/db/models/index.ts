import { User, UserSchema } from "./user.model";
import { Product, ProductSchema } from "./product.model";
import { Order, OrderSchema } from "./order.model";
import { Category, CategorySchema } from "./category.model";
import { Customer, CustomerSchema } from "./customer.model";
import type { Sequelize } from "sequelize";

/*
- obtain the connection
- make the initial configuration
*/
function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));

  User.associate(sequelize);
  Customer.associate(sequelize);
}

export { setupModels };
