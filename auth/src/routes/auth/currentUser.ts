import { Request, Response, Router } from "express";
import { currentUser } from "@karissa32/common";

const router = Router();

router.route("/currentuser").get(currentUser, (req: Request, res: Response) => {
    console.log({currentUser: req.currentUser})
    return res.send({currentUser: req.currentUser});
});

export default router;
