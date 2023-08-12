import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User } from "../../models/users";
import BadRequestError from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
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
    async (req: Request, res: any) => {
  
      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError("Email already in user");
      }
    
      const hashedPassword = await Password.toHash(password);
       
      const user = User.build({ email, password: hashedPassword });

      await user.save();

      const userJwt: any = jwt.sign({
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
