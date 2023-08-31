import Router, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@karissa32/common";
import { body } from "express-validator";
import { Ticket } from "../../models/ticket";

const router = Router();

router.post(
  "/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price is required and greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      title,
      price,
    } = req.body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });
    await ticket.save();
    res.status(201).send({});
  }
);

export default router;
