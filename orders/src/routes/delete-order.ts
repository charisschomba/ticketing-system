import Router, { Request, Response } from "express";
import { Order } from "../models/order";
import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@karissa32/common";

const router = Router();
router
  .route("/orders/:id")
  .delete(requireAuth, async (req: Request, res: Response) => {
    const orderId = req.params.id;

    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();

    return res.status(204).send(order);
  });

export default router;
