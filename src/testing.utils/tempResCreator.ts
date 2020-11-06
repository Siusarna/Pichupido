import request from 'supertest';
import Koa from 'koa';
import { v4 as uuidv4 } from 'uuid';
import { goodImg } from './images';

export class TemporaryResourseCreator {
  server: Koa;

  constructor(server: Koa) {
    this.server = server;
  }


  signIn = async (): Promise<string[]> => {
    const user = uuidv4();
    const password = 'qwerty12345!'
    const email = `${user}@example.com`;

    await request(this.server.callback())
      .post('/accounts/sign-up')
      .type('json')
      .send({
        email,
        password,
        confirmPassword: password,
        firstName: 'Ivan',
        lastName: 'Petrenko',
        role: 'admin'
      });
    const signInResponse = await request(this.server.callback())
      .post('/accounts/sign-in')
      .type('json')
      .send({
        email,
        password,
      });

    const cookies = signInResponse.get('Set-Cookie');
    return cookies;
  };

  deleteAcc = async (cookies: string[]): Promise<void> => {
    await request(this.server.callback())
      .delete('/accounts/profile')
      .set('Cookie', cookies);
  };

  createRestaurant = async (cookies: string[]): Promise<number> => {
    const restaurant = {
      name: 'Restaurant',
      logo: goodImg,
      cover: goodImg,
      workingHours: '15:00 - 23:00',
      location: 'Kyiv',
      description: 'Beautiful spot, good food'
    };

    const responsePost = await request(this.server.callback())
      .post('/restaurants')
      .type('json')
      .set('Cookie', cookies)
      .send(restaurant);

    const { id } = responsePost.body;
    return id;
  };

  deleteRestaurant = async (cookies: string[], id: number): Promise<void> => {
    await request(this.server.callback())
      .delete(`/restaurants/${id}`)
      .set('Cookie', cookies);
  }
}

