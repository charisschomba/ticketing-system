import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { User } from "../../models/users";
import BadRequestError from "../../errors/bad-request-error";

const router = Router();

router
  .route("/signup")
  .post(
    [
      body("email").isEmail().withMessage("Use a valid email address"),
      body("password")
        .trim()
        .isLength({ min: 4 })
        .withMessage("Password must be at least 4 characters"),
    ],
    async (req: Request, res: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email })

      if (existingUser) {
          throw new BadRequestError("Email already in user")
      }

      const user = User.build({ email, password })

      await user.save();

      res.status(201).send(user)
    }
  );

export default router;
