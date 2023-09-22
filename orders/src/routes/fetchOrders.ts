import Router, { Request, Response } from "express"
import { Order } from "../models/order";
import {NotFoundError} from "@karissa32/common";

const router = Router();
router.route("/orders")
.get(
    async (req: Request, res: Response) => {
        // const tickets = await Ticket.find({})
        // if(!tickets) {
        //     throw new NotFoundError()
        // }
        return res.send([]);
    }
)

export default router;
