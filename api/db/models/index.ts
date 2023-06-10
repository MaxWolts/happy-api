import { User, UserSchema } from "./user.model";
import type { Sequelize } from "sequelize";

/*
- obtein the conecction
- make the initial configuration
*/
function setupModels(sequelize: Sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

export { setupModels };
