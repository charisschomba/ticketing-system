import supertest from "supertest";
import app from "../../app";
import request from "supertest";

const createTicket = () => {
    return request(app)
        .post('/api/v1/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'najkqq',
            price: 76,
        })
}
it('should fetch all tickets', async () => {

    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app).get("/api/v1/tickets").send();

    expect(response.body.length).toEqual(3)

});