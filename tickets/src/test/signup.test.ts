import request from "supertest";
import app from "../app";

it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "chaplin@yopmail.com",
      password: "1234",
    })
    .expect(201);
});

it("returns 400 with an invalid email", async () => {
  return request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "qqqqq",
      password: "sdssdsas",
    })
    .expect(400);
});

it("returns 400 with email or password missing", async () => {
  return request(app).post("/api/v1/auth/signup").send({}).expect(400);
});

it("disallow signing up with same email", async () => {
    await request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "chaplin@yopmail.com",
        password: "1234",
      })
      .expect(201);

      await request(app)
      .post("/api/v1/auth/signup")
      .send({
        email: "chaplin@yopmail.com",
        password: "1234",
      })
      .expect(400);
  });

  it("sends a cookie after successfull signup",async () => {
    const res = await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email: "chaplin@yopmail.com",
      password: "1234",
    })
    .expect(201);
    expect(res.get("Set-Cookie")).toBeDefined();
  })