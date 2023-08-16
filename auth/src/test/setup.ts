import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "sjasgbjsahw";

  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "admin@admin.com";
  const password = "1234";

  const res = await request(app)
    .post("/api/v1/auth/signup")
    .send({ email, password })
    .expect(201);

  const cookie = res.get("Set-Cookie");

  return cookie;
};

declare global {
  var signin: () => Promise<string[]>;
}
