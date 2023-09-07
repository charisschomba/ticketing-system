import { Publisher, Subjects, TicketCreatedEvent } from "@karissa32/common";

export class TicketCreatedPusblisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
}
