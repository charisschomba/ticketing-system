import { Message } from "node-nats-streaming";
import { Subjects, TicketUpdatedEvent, Listener } from "@karissa32/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;
    onMessage = async(data: TicketUpdatedEvent["data"], mgs: Message) => {
        const {id, title, price } = data;
        const ticket = await  Ticket.findByEvent(data)
        if(!ticket) {
            throw new Error("Ticket not found")
        }
        ticket.set({title, price})
        await ticket.save();
        mgs.ack();
    }
    
}