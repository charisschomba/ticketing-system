import { Request, Response, Router } from "express";

const router = Router();

router.route("/signout").post((req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

export default router;
