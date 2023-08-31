import newTicket from "./new-ticket"

const routes = (app: any) => {
    app.use("/api/v1", newTicket)

}

export default routes;