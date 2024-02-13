import express from "express";
import passport from "passport";
import { OrderService } from "../services/order.service";

export const router = express.Router();
const services = new OrderService();

router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const user: any = req.user;
      const orders = await services.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);
