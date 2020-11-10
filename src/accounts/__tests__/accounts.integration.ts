import request from 'supertest';
import Koa from 'koa';
import { app, start } from '../../app';
import { v4 as uuidv4 } from 'uuid';

let server: Koa;
beforeAll(async () => {
  jest.setTimeout(10000);
  server = await start(app, function () { return });
});

describe('accounts tests', () => {
  test('basic authorization flow should work', async () => {
    const user = uuidv4();
    const password = 'qwerty12345!'
    const email = `${user}@example.com`;

    const signUpResponse = await request(server.callback())
      .post('/api/v1/accounts/sign-up')
      .type('json')
      .send({
        email,
        password,
        confirmPassword: password,
        firstName: 'Ivan',
        lastName: 'Petrenko',
        role: 'admin'
      });

    expect(signUpResponse.status).toBe(204);

    const signInResponse = await request(server.callback())
      .post('/api/v1/accounts/sign-in')
      .type('json')
      .send({
        email,
        password,
      });

    expect(signInResponse.status).toBe(200);
    const cookies = signInResponse.get('Set-Cookie');
    const profile = await request(server.callback())
      .get('/api/v1/accounts/profile')
      .set('Cookie', cookies);

    expect(profile.body).toMatchObject({
      id: expect.any(Number),
      email,
      firstName: 'Ivan',
      lastName: 'Petrenko',
      role: 'admin'
    });

    const deleteResponse = await request(server.callback())
      .delete('/api/v1/accounts/profile')
      .set('Cookie', cookies);

    expect(deleteResponse.status).toBe(204);
  });

  test('should return validation error if sign-up data is invalid', async() => {
    const user = uuidv4();
    const password = 'qwerty'
    const email = `${user}@example.com`;

    const response = await request(server.callback())
      .post('/api/v1/accounts/sign-up')
      .type('json')
      .send({
        email,
        password,
        confirmPassword: password,
        firstName: 'Ivan',
        lastName: 'Petrenko',
        role: 'admin'
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.any(String),
    })
  });

  test('should return validation error if passwords don\'t match', async() => {
    const user = uuidv4();
    const password = 'qwerty12345!'
    const email = `${user}@example.com`;

    const response = await request(server.callback())
      .post('/api/v1/accounts/sign-up')
      .type('json')
      .send({
        email,
        password,
        confirmPassword: 'qwerty',
        firstName: 'Ivan',
        lastName: 'Petrenko',
        role: 'admin'
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.any(String),
    })
  });
})
