import newTicket from "./new-ticket"
import getTicket from "./get-ticket";
import fetchTickets from "./fetch-tickets";
import updateTicket from "./update-ticket";

const routes = (app: any) => {
    app.use("/api/v1", newTicket)
    app.use("/api/v1", getTicket)
    app.use("/api/v1", fetchTickets)
    app.use("/api/v1", updateTicket)
}

export default routes;