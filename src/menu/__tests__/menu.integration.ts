import request from 'supertest';
import Koa from 'koa';
import { app, start } from '../../app';
import { TemporaryResourseCreator } from '../../testing.utils/tempResCreator';

let server: Koa;
beforeAll(async () => {
  jest.setTimeout(10000);
  server = await start(app, function () { return });
});

describe('menu tests', () => {
  test('basic flow with menu should work', async () => {
    const tempResCreator = new TemporaryResourseCreator(server);
    const cookies = await tempResCreator.signIn();
    const restaurantId = await tempResCreator.createRestaurant(cookies);

    const menu = {
      name: 'Summer',
    };

    const responsePost = await request(server.callback())
      .post('/menu')
      .type('json')
      .set('Cookie', cookies)
      .send(menu);
    expect(responsePost.status).toBe(201);
    expect(responsePost.body).toMatchObject({
      id: expect.any(Number)
    });
    const { id } = responsePost.body;

    const responseGet = await request(server.callback())
      .get(`/menu/${id}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toEqual({
      id,
      restaurantId,
      name: 'Summer',
      isActive: false,
    });

    const responseUpdate = await request(server.callback())
      .put(`/menu/${id}`)
      .type('json')
      .set('Cookie', cookies)
      .send({ name: 'NewName' });
    expect(responseUpdate.status).toBe(204);

    const responseGet2 = await request(server.callback())
      .get(`/menu/${id}`);
    expect(responseGet2.status).toBe(200);
    expect(responseGet2.body).toMatchObject({
      name: 'NewName'
    });

    const responseActivate = await request(server.callback())
      .put(`/menu/${id}/activate`)
      .type('json')
      .set('Cookie', cookies)
      .send({ name: 'NewName' });
    expect(responseActivate.status).toBe(204);

    const responseGet3 = await request(server.callback())
      .get(`/menu/${id}`);
    expect(responseGet3.status).toBe(200);
    expect(responseGet3.body).toMatchObject({
      isActive: true,
    });

    const responseDeactivate = await request(server.callback())
      .put(`/menu/${id}/deactivate`)
      .type('json')
      .set('Cookie', cookies)
      .send({ name: 'NewName' });
    expect(responseDeactivate.status).toBe(204);

    const responseGet4 = await request(server.callback())
      .get(`/menu/${id}`);
    expect(responseGet4.status).toBe(200);
    expect(responseGet4.body).toMatchObject({
      isActive: false,
    });

    const responseDelete = await request(server.callback())
      .delete(`/menu/${id}`)
      .set('Cookie', cookies);
    expect(responseDelete.status).toBe(204);

    await tempResCreator.deleteRestaurant(cookies, restaurantId);
    await tempResCreator.deleteAcc(cookies);
  });
});
