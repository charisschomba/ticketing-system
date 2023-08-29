import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../../models/users";
import { validateRequest, BadRequestError } from "@karissa32/common";
import Password from "../../services/pasword";

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
    ], validateRequest,
    async (req: Request, res: Response) => {
  
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError("Email already in user");
      }
    
      const hashedPassword = await Password.toHash(password);
       
      const user = User.build({ email, password: hashedPassword });

      await user.save();

      const userJwt: string = jwt.sign({
        id: user.id,
        email: user.email,
      }, process.env.JWT_KEY!)


      req.session = {
        jwt: userJwt
      }

      res.status(201).send(user);
    }
  );

export default router;
