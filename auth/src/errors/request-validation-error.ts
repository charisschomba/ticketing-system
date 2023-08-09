import {
  AlternativeValidationError,
  FieldValidationError,
  GroupedAlternativeValidationError,
  UnknownFieldsError,
  ValidationError,
} from "express-validator";
import CustomError from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(
    public errors: (
      | AlternativeValidationError
      | GroupedAlternativeValidationError
      | UnknownFieldsError
      | FieldValidationError
      | any
    )[]
  ) {
    super("Something went wrong");
    // Only because we are extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error) => {
      if (error.type === "field") {
        return { message: error.msg, field: error.path };
      }
      return { message: error.msg };
    });
  }
}
