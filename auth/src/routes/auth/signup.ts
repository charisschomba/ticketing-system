import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { DatabaseConnectionError } from "../../errors/database-connection-error";

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
    (req: Request, res: any) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }
      throw new DatabaseConnectionError();
      res.json({});
    }
  );

export default router;
