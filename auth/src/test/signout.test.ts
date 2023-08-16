import request from "supertest";
import app from "../app";

it("clears cookie on signout", async () => {
    await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "chaplin@yopmail.com",
      password: "1234",
    })
    .expect(201);
    const res = await request(app)
      .post("/api/v1/auth/signout")
      .send({})
      .expect(200);
  });
