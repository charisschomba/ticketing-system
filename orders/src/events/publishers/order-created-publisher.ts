import { Publisher, OrderCreatedEvent, Subjects } from "@karissa32/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
} 