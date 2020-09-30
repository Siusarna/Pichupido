import * as request from 'supertest';
import { app, start } from './app';

let server: any;
beforeAll(async () => {
  jest.setTimeout(10000);
  server = await start(app, () => {
  });
});

test('it works', async () => {
  const response = await request(server.callback()).get('/');

  expect(response.status).toBe(200);
  expect(response.type).toEqual('text/plain');
  expect(response.body).toEqual({});
});
