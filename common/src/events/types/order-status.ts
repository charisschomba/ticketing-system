export enum OrderStatus {
    /*
    When the order has been created, but ticket it is 
    trying to order has been reserved
    */ 
    Created = "created",
    /*
    The ticket the order is trying to reserve has already been
    reserved or wnhen the user has cancelled the order or
    when the order expires before payment.
    */ 
    Cancelled = "cancelled",
    /*
    The order has successfully reserved the ticket
    */ 
    AwaitingPayment = "awaiting:payment",
    /*
    The order has reserved the ticket and provided payment successful.
    */ 
    Complete = "Complete",
}