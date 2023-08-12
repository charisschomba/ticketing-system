import CustomError from "./custom-error";

class NotAthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, NotAthorizedError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not Authorized" }];
  }
}

export default NotAthorizedError;
