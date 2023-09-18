import newOrder from "./newOrder"
import getOrder from "./getOrder";
import fetchOrders from "./fetchOrders";
import deleteOrder from "./deleteOrder";

const routes = (app: any) => {
    app.use("/api/v1", newOrder)
    app.use("/api/v1", getOrder)
    app.use("/api/v1", fetchOrders)
    app.use("/api/v1", deleteOrder)
}

export default routes;