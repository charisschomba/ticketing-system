import app from "./app";
import mongoose from "mongoose";
import { DatabaseConnectionError } from "@karissa32/common";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};
app.listen(3000, () => console.log("Listening on port 3000"));

start();
