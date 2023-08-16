import request from "supertest"
import app from "../app"

it("responds with current user", async () => {
    const cookie = await signin();
    const res = await request(app)
    .get("/api/v1/auth/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
    expect(res.body.email).toEqual("admin@admin.com")
})

it("responds with null if not authenticated", async () => {
    const res = await request(app)
    .get("/api/v1/auth/currentuser")
    .send()
    .expect(200);
    expect(res.body.email).toEqual(undefined)
})