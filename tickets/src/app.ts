import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan from "morgan";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFoundError } from "@karissa32/common";
import routes from "./routes";


const app = express();

app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);
app.use(morgan("tiny"));
routes(app)
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;