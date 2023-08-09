import {Request, Response, Router} from "express";

const router = Router();

router.route('/signin')
    .post((req: Request, res: any) => {
        res.json({
            msg: "Hello"
        })
    })

export default router;