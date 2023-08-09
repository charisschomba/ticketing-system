import {Request, Response, Router} from "express";

const router = Router();

router.route('/currentuser')
    .get((req: Request, res: any) => {
        res.json({
            msg: "Hello"
        })
    })

export default router;