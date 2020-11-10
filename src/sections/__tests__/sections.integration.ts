import request from 'supertest';
import Koa from 'koa';
import { app, start } from '../../app';
import { TemporaryResourseCreator } from '../../testing.utils/tempResCreator';

let server: Koa;
beforeAll(async () => {
  jest.setTimeout(10000);
  server = await start(app, function () { return });
});

describe('sections tests', () => {
  test('basic flow with sections should work', async () => {
    const tempResCreator = new TemporaryResourseCreator(server);
    const cookies = await tempResCreator.signIn();
    const restaurantId = await tempResCreator.createRestaurant(cookies);

    const section = {
      name: 'Drinks',
    };

    const responsePost = await request(server.callback())
      .post(`/api/v1/restaurants/${restaurantId}/sections`)
      .type('json')
      .set('Cookie', cookies)
      .send(section);
    expect(responsePost.status).toBe(201);
    expect(responsePost.body).toMatchObject({
      id: expect.any(Number)
    });
    const { id } = responsePost.body;

    const responseGet = await request(server.callback())
      .get(`/api/v1/restaurants/${restaurantId}/sections/${id}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual({
      id,
      restaurantId,
      name: 'Drinks',
    });

    const responseUpdate = await request(server.callback())
      .put(`/api/v1/restaurants/${restaurantId}/sections/${id}`)
      .type('json')
      .set('Cookie', cookies)
      .send({ name: 'NewName' });
    expect(responseUpdate.status).toBe(204);

    const responseGet2 = await request(server.callback())
      .get(`/api/v1/restaurants/${restaurantId}/sections/${id}`);
    expect(responseGet2.status).toBe(200);
    expect(responseGet2.body).toMatchObject({
      name: 'NewName'
    });

    const responseDelete = await request(server.callback())
      .delete(`/api/v1/restaurants/${restaurantId}/sections/${id}`)
      .set('Cookie', cookies);
    expect(responseDelete.status).toBe(204);

    await tempResCreator.deleteRestaurant(cookies, restaurantId);
    await tempResCreator.deleteAcc(cookies);
  });
});
