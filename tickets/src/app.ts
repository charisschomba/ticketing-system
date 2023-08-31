import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan from "morgan";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@karissa32/common";


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

app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export default app;