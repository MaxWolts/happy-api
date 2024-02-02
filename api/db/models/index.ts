import { User, UserSchema } from "./user.model";
import { Product, ProductSchema } from "./product.model";
import { Order, OrderSchema } from "./order.model";
import { Category, CategorySchema } from "./category.model";
import { Customer, CustomerSchema } from "./customer.model";
import {
  ProductCategory,
  ProductCategorySchema,
} from "./product-category.model";
import { OrderProduct, OrderProductSchema } from "./order-product.model";
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
  ProductCategory.init(
    ProductCategorySchema,
    ProductCategory.config(sequelize)
  );
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  User.associate(sequelize);
  Customer.associate(sequelize);
  Category.associate(sequelize);
  Product.associate(sequelize);
  Order.associate(sequelize);
}

export { setupModels };
