import request from "supertest";
import app from "../app";

it("fails when an email does not exist", async () => {
    return request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "chaplin@yopmail.com",
        password: "1234",
      })
      .expect(400);
  });

  it("fails when wrong password is used", async () => {
    await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "chaplin@yopmail.com",
      password: "1234",
    })
    .expect(201);
    await request(app)
      .post("/api/v1/auth/signin")
      .send({
        email: "chaplin@yopmail.com",
        password: "12343",
      })
      .expect(400);
  });

  it("sends a cookie after successfull signin",async () => {
    await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "chaplin@yopmail.com",
      password: "1234",
    })
    const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "chaplin@yopmail.com",
      password: "1234",
    })
    .expect(200);
    expect(res.get("Set-Cookie")).toBeDefined();
  })