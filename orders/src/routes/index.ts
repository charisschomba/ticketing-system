import newOrder from "./new-order"
import getOrder from "./get-order";
import fetchOrders from "./fetch-order";
import deleteOrder from "./delete-order";

const routes = (app: any) => {
    app.use("/api/v1", newOrder)
    app.use("/api/v1", getOrder)
    app.use("/api/v1", fetchOrders)
    app.use("/api/v1", deleteOrder)
}

export default routes;