import { Request, Response, Router } from "express";
import { Listener, Subjects, TicketCreatedEvent, requireAuth, validateRequest } from "@karissa32/common";
import { body } from "express-validator";
import { Ticket } from "../../models/ticket";
import { TicketCreatedPusblisher } from "../events/publishers/ticket-created";
import { natsWrapper } from "../nats-wrapper";
import { Message } from "node-nats-streaming";

const router = Router();

router
  .route("/tickets")
  .post(
    requireAuth,
    [
      body("title").not().isEmpty().withMessage("Title is required"),
      body("price")
        .isFloat({ gt: 0 })
        .withMessage("Price is required and greater than 0"),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { title, price } = req.body;
      const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id,
      });
      await ticket.save();
      new TicketCreatedPusblisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      });
      res.status(201).send(ticket);
    }
  );

export default router;
