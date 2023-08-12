import { Request, Response, Router } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import BadRequestError from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/users";
import Password from "../../services/pasword";

const router = Router();

router
  .route("/signin")
  .post(
    [
      body("email").isEmail().withMessage("Use a valid email address"),
      body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password is required"),
    ],
    validateRequest,
    async (req: Request, res: any) => {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        throw new BadRequestError("Invalid credentials");
      }

      const passwordMatches = await Password.compare(user.password, password);

      if (!passwordMatches) {
        throw new BadRequestError("Invalid credentials");
      }

      const userJwt: any = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

        req.session = {
          jwt: userJwt
        }

        return res.status(200).send(user)
    }
  );

export default router;
