import request from 'supertest';
import Koa from 'koa';
import { app, start } from '../../app';
import { TemporaryResourseCreator } from '../../testing.utils/tempResCreator';

let server: Koa;
beforeAll(async () => {
  jest.setTimeout(10000);
  server = await start(app, function () { return });
});

describe('tables tests', () => {
  test('basic flow with tables should work', async () => {
    const tempResCreator = new TemporaryResourseCreator(server);
    const cookies = await tempResCreator.signIn();
    const restaurantId = await tempResCreator.createRestaurant(cookies);

    const responsePost = await request(server.callback())
      .post(`/api/v1/restaurants/${restaurantId}/tables`)
      .type('json')
      .set('Cookie', cookies);
    expect(responsePost.status).toBe(201);
    expect(responsePost.body).toMatchObject({
      id: expect.any(Number)
    });
    const { id } = responsePost.body;

    const responseGet = await request(server.callback())
      .get(`/api/v1/restaurants/${restaurantId}/tables/${id}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toMatchObject({
      id,
      restaurantId,
      url: expect.stringMatching(/^https?:\/\/.*$/),
      qrCodeUrl: expect.stringMatching(/^https?:\/\/.*$/),
    });

    const responseDelete = await request(server.callback())
      .delete(`/api/v1/restaurants/${restaurantId}/tables/${id}`)
      .set('Cookie', cookies);
    expect(responseDelete.status).toBe(204);

    await tempResCreator.deleteRestaurant(cookies, restaurantId);
    await tempResCreator.deleteAcc(cookies);
  });
});
