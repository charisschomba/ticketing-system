import Router, { Request, Response } from "express";
import { Order } from "../models/order";
import { NotFoundError, requireAuth } from "@karissa32/common";

const router = Router();
router
  .route("/orders")
  .get(requireAuth, async (req: Request, res: Response) => {
    const orders = await Order.find({ userId: req.currentUser?.id }).populate(
      "ticket"
    );
    if (!orders) {
      throw new NotFoundError();
    }
    return res.send(orders);
  });

export default router;
