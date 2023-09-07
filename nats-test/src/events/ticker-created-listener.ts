import { Message } from "node-nats-streaming";
import Listener from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = "payment-service";
  
    onMessage(data: TicketCreatedEvent['data'], mgs: Message): void {
      console.log("Event data!", data);
      mgs.ack();
    }
  }
  
  export default TicketCreatedListener;