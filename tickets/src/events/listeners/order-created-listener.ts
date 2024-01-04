import {Listener, OrderCreatedEvent, Subjects} from "@karissa32/common";
import {Message} from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import {Ticket} from "../../../models/ticket";
import {TicketUpdatedPusblisher} from "../publishers/ticket-updated";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    queueGroupName = queueGroupName;
    subject: Subjects.OrderCreated = Subjects.OrderCreated;

    async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
        // find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);
        if(!ticket) {
            throw new Error("Ticket not found");
        }
       // mark the ticket as being reserved by setting its order property
        ticket.set({orderId: data.id});
        await ticket.save();
       //  Emit event to other services
       //  new TicketUpdatedPusblisher()
       // ack the message
        msg.ack()
    }

}