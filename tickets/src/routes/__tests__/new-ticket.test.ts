import request from "supertest";
import app from "../../app";
import { Ticket } from "../../../models/ticket";


it("has a route handler listening to /api/v1/tickets for post requests",async () => {
    const response = await request(app)
    .post('/api/v1/tickets')
    .send({})

    expect(response.status).not.toEqual(404);

})

it("can only be accessed if a user is signed in",async () => {
    const response = await request(app)
    .post("/api/v1/tickets")
    .send({})
    .expect(401)
})

it("returns a status other than 401 if a user is signed in", async () => {
    const response = await request(app)
    .post('/api/v1/tickets')
    .set("Cookie", global.signin())
    .send({})
    expect(response.status).not.toEqual(401)
})

it("returns an error if a invalid title is provided",async () => {
    const response = await request(app)
    .post('/api/v1/tickets')
    .set("Cookie", global.signin())
    .send({
        title: "",
        price: 400
    })
    .expect(400)
})

it("returns an error if a invalid price is provided",async () => {
    const response = await request(app)
    .post('/api/v1/tickets')
    .set("Cookie", global.signin())
    .send({
        title: "Mombasa",
        price: -10
    })
    .expect(400)
})

it("creates a tickets with correct inputs",async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0)
    const response = await request(app)
    .post('/api/v1/tickets')
    .set("Cookie", global.signin())
    .send({
        title: "Mombasa",
        price: 10.00
    })
    .expect(201)
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1)
})