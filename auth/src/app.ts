import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan from "morgan";
import cookieSession from "cookie-session";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.handlers";
import NotFoundError from "./errors/not-found-error";


const app = express();

app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(morgan("tiny"));

routes(app);
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;