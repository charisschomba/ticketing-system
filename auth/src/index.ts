import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import { json } from "body-parser";
import morgan from "morgan";

import routes from "./routes";
import { errorHandler } from "./middlewares/error.handlers";
import NotFoundError from "./errors/not-found-error";

const app = express();

app.use(json());
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

routes(app);
app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});
app.use(errorHandler);
app.listen(3000, () => console.log("Listening on port 3000"));
