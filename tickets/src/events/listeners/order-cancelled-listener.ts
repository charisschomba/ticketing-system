import {Listener, OrderCancelledEvent, Subjects} from "@karissa32/common";
import {Message} from "node-nats-streaming";
import {queueGroupName} from "./queue-group-name";
import {Ticket} from "../../../models/ticket";
import {TicketUpdatedPusblisher} from "../publishers/ticket-updated";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    queueGroupName = queueGroupName;
    subject: OrderCancelledEvent["subject"] = Subjects.OrderCancelled;

    async onMessage(data: OrderCancelledEvent["data"], msg: Message) {

        const ticket = await Ticket.findById(data.ticket.id);

        if(!ticket) {
            throw new Error("Ticket not found");
        }

        ticket.set({orderId: undefined});
        await  ticket.save();
        await  new TicketUpdatedPusblisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            version: ticket.version,
            orderId: ticket.orderId
        })

        msg.ack();
    }

}