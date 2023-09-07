import { Publisher, Subjects, TicketUpdatedEvent } from "@karissa32/common";

export class TicketUpdatedPusblisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}