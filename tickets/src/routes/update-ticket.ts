import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
} from "@karissa32/common";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPusblisher } from "../events/publishers/ticket-updated";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router
  .route("/tickets/:id")
  .put(
    requireAuth,
    [
      body("title").not().isEmpty().withMessage("Title is required"),
      body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be provided and must be greater than 0"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      let ticket = await Ticket.findById(req.params.id);

      if (!ticket) {
        throw new NotFoundError();
      }
      //@ts-ignore
      if (req.currentUser!.id !== ticket.userId) {
        throw new NotAuthorizedError();
      }
      ticket.set(req.body);
      await ticket.save();
      new TicketUpdatedPusblisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      });
      res.send(ticket);
    }
  );

export default router;
