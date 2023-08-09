import CustomError from "./custom-error";

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super("Route not found");

    Object.setPrototypeOf(this, NotFoundError);
  }
  serializeErrors(): { message: string; field?: string }[] {
    return [{ message: "Not Found" }];
  }
}

export default NotFoundError;
