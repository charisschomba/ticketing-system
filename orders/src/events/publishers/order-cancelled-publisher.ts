import { OrderCancelledEvent, Publisher, Subjects } from "@karissa32/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}