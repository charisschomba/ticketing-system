import nats from "node-nats-streaming";
import TicketCreatedPublisher from "./events/ticket-created-publisher";

const stan = nats.connect("ticketing", "abc", {url: "http://localhost:4222"});

stan.on("connect", async () => {

    console.log("Publisher connected to NATS")

    const publisher = new TicketCreatedPublisher(stan)

    const data = {
        id: "2eee",
        title: "concert",
        price: 59

    }

   try {
    await publisher.publish(data)
   } catch (error) {
    console.log(error)
   }

})