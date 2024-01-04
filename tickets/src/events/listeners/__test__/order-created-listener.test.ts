import {OrderCreatedListener} from "../order-created-listener";
import {natsWrapper} from "../../../nats-wrapper";
import {Ticket} from "../../../../models/ticket";
import {OrderCreatedEvent, OrderStatus} from "@karissa32/common";
import mongoose from "mongoose";
import {Message} from "node-nats-streaming";

const setup = async () => {
    // create listener instance
    const listener = new OrderCreatedListener(natsWrapper.client);
    // create ticket record
    const ticket = Ticket.build({
        title: "concert",
        price: 65,
        userId: "jsjkskjw"
    })
    await ticket.save();
    // fake the data event
    const data: OrderCreatedEvent['data'] = {
        userId: ticket.userId,
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: "scvsvd",
        status: OrderStatus.Created,
        ticket: {
            id: ticket.id,
            price: 102
        }
    }
    // fake nats message
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, ticket, data, msg}
}

it("sets the orderId of the ticket", async () => {
    const { listener, ticket, data, msg} = await setup();

    await  listener.onMessage(data, msg);

    const updatedTicket = await  Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id)

})
it("acts the msg", async () => {
    const { listener, ticket, data, msg} = await setup();

    await  listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled()
})

it("publishes a ticket updated event", async () => {
    const { listener, ticket, data, msg} = await setup();
    await listener.onMessage(data, msg);
    expect(natsWrapper.client.publish).toHaveBeenCalled()
    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
    expect(data.id).toEqual(ticketUpdatedData.orderId)
})