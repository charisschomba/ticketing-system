import supertest from "supertest";
import app from "../../app";
import request from "supertest";
import mongoose from "mongoose";

it('should return 404 if a ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/v1/ticket/${id}`)
        .send({})
        .expect(404)
});

it('should return a ticket if it exists', async () => {
    const title = 'concert';
    const price = 20;

    const response = await request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price,
        })
        .expect(201);

    const ticketResponse = await request(app)
        .get(`/api/v1/tickets/${response.body.id}`)
        .send()
        .expect(200);

    expect(ticketResponse.body.title).toEqual(title);
    expect(ticketResponse.body.price).toEqual(price);
});