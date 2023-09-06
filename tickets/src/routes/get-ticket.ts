import { Request, Response, Router} from "express";
import {NotFoundError, requireAuth} from "@karissa32/common";
import {Ticket} from "../../models/ticket"

const router = Router();

router.route("/tickets/:id").get(async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) {
        throw new NotFoundError();
    }
    return res.send(ticket);
})

export default router;