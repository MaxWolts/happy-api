import { Strategy } from "passport-local";
import boom from "@hapi/boom";
import bcryptjs from "bcryptjs";
import { UserService } from "../../../services/user.service";

const service = new UserService();

export const LocalStrategy = new Strategy({
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user: any = await service.findByEmail(email);

      if (!user) {
        done(boom.unauthorized(), false);
      }
      const isMath = await bcryptjs.compare(password, user.dataValues.password);

      if (!isMath) {
        done(boom.unauthorized(), false);
      }
      delete user.dataValues.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
