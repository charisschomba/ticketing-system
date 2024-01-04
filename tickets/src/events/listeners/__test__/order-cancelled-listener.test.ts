import { OrderCancelledListener } from "../order-cancelled-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../../models/ticket";
import {OrderCancelledEvent, OrderStatus} from "@karissa32/common";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";

const setup = async () => {
    // create listener instance
    const listener = new OrderCancelledListener(natsWrapper.client);
    const orderId =  new mongoose.Types.ObjectId().toHexString();
    // create ticket record
    const ticket = Ticket.build({
        title: "concert",
        price: 65,
        userId: "jsjkskjw",
    });
    ticket.set({orderId: orderId})
    await ticket.save();
    // fake the data event
    const data: OrderCancelledEvent['data'] = {
        id: orderId,
        version: 0,
        ticket: {
            id: ticket.id,
        }
    }
    // fake nats message
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, ticket, data, msg, orderId}
}

it("updates the ticket, publishes an event and ack the message", async () => {
    const { listener, ticket, data, msg, orderId} = await setup();

    await  listener.onMessage(data, msg);

    const updatedTicket = await  Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).not.toBeDefined();
    expect(msg.ack).toHaveBeenCalled();
    expect(natsWrapper.client.publish).toHaveBeenCalled();

})