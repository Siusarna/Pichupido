import request from 'supertest';
import Koa from 'koa';
import { app, start } from '../../app';
import { goodImg } from '../../testing.utils/images';
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
    const restaurant = {
      name: 'Restaurant',
      logo: goodImg,
      cover: goodImg,
      workingHours: '15:00 - 23:00',
      location: 'Kyiv',
      description: 'Beautiful spot, good food'
    };

    const responsePost = await request(server.callback())
      .post('/restaurants')
      .type('json')
      .set('Cookie', cookies)
      .send(restaurant);
    expect(responsePost.status).toBe(201);
    expect(responsePost.body).toMatchObject({
      id: expect.any(Number)
    });

    const { id } = responsePost.body;

    const responseGet = await request(server.callback())
      .get(`/restaurants/${id}`);
    expect(responseGet.status).toBe(200);
    expect(responseGet.body).toMatchObject({
      ...restaurant,
      id,
      logo: expect.stringMatching(/^https?:\/\/.*$/),
      cover: expect.stringMatching(/^https?:\/\/.*$/),
    });

    const responseUpdate = await request(server.callback())
      .put(`/restaurants/${id}`)
      .type('json')
      .set('Cookie', cookies)
      .send({ name: 'NewName' });
    expect(responseUpdate.status).toBe(204);

    const responseGet2 = await request(server.callback())
      .get(`/restaurants/${id}`);
    expect(responseGet2.status).toBe(200);
    expect(responseGet2.body).toMatchObject({
      name: 'NewName'
    });

    const responseDelete = await request(server.callback())
      .delete(`/restaurants/${id}`)
      .set('Cookie', cookies);
    expect(responseDelete.status).toBe(204);

    await tempResCreator.deleteAcc(cookies);
  });
});
