import { Request, Response, Router } from "express";
import { currentUser } from "../../middlewares/current-user";

const router = Router();

router.route("/currentuser").get(currentUser, (req: Request, res: Response) => {
    return res.send(req.currentUser) || res.send(null)
});

export default router;
