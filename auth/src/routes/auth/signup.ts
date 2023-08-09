import {Request, Response, Router} from "express";

const router = Router();

router.route('/signup')
    .post((req: Request, res: any) => {
        res.json({
            msg: "Hello"
        })
    })

export default router;