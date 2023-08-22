import { Request, Response, Router } from "express";
import { currentUser } from "../../middlewares/current-user";

const router = Router();

router.route("/currentuser").get(currentUser, (req: Request, res: Response) => {
    return res.send({currentUser: req.currentUser});
});

export default router;
