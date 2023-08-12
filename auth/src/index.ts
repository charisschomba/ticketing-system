import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.handlers";
import NotFoundError from "./errors/not-found-error";
import { DatabaseConnectionError } from "./errors/database-connection-error";

const app = express();

app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(morgan("tiny"));

routes(app);
app.all("*", async (req: Request, res: Response) => {
  throw new NotFoundError();
});
app.use(errorHandler);
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/ticketing-auth");
    console.log("Connected to mongodb");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};
app.listen(3000, () => console.log("Listening on port 3000"));

start();
