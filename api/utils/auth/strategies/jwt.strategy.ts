import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "../../../config/config";

const jwtSecret = config.jwtSecret || "defaultSecret";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

export const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});
