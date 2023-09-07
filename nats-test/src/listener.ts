import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import TicketCreatedListener from "./events/ticker-created-listener";

const stan = nats.connect("ticketing", randomBytes(5).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("Closing connectionn");
    process.exit();
  });
 
  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close);
process.on("SIGTERM", () => stan.close());



