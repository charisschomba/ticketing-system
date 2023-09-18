import Router, { Request, Response } from "express"
// import { Ticket } from "../../models/ticket";
import {NotFoundError} from "@karissa32/common";

const router = Router();
router.route("/tickets:/id")
.get(
    async (req: Request, res: Response) => {
        // const tickets = await Ticket.find({})
        // if(!tickets) {
        //     throw new NotFoundError()
        // }
        return res.send({});
    }
)

export default router;

