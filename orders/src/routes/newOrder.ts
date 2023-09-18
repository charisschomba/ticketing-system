import Router, { Request, Response } from "express"
import mongoose from "mongoose";
// import { Ticket } from "../../models/ticket";
import {NotFoundError, requireAuth, validateRequest} from "@karissa32/common";
import { body } from "express-validator";

const router = Router();
router.route("/tickets")
.post(
    requireAuth,
    [body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage("Valid ticket must be provided")],
    validateRequest,
    async (req: Request, res: Response) => {
        // const tickets = await Ticket.find({})
        // if(!tickets) {
        //     throw new NotFoundError()
        // }
        return res.send({});
    }
)

export default router;

