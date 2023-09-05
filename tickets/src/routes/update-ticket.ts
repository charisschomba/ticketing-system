import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError,
} from '@karissa32/common';
import { Ticket } from '../../models/ticket';

const router = express.Router();

router.put(
    '/tickets/:id',
    requireAuth,
    [
        body('title').not().isEmpty().withMessage('Title is required'),
        body('price')
            .isFloat({ gt: 0 })
            .withMessage('Price must be provided and must be greater than 0'),
    ],
    async (req: Request, res: Response) => {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            throw new NotFoundError();
        }
        //@ts-ignore
        if(req.currentUser!.id !== ticket.userId) {
            throw new NotAuthorizedError();
        }
        res.send(ticket);
    }
);

export default router;
