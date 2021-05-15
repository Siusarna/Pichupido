// import request from 'supertest';
// import Koa from 'koa';
// import { app, start } from '../../app';
// import { TemporaryResourseCreator } from '../../testing.utils/tempResCreator';
// import { goodImg } from '../../testing.utils/images';
//
// let server: Koa;
// beforeAll(async () => {
//   jest.setTimeout(20000);
//   server = await start(app, function () { return });
// });
//
// describe('dishes tests', () => {
//   test('basic flow with dishes should work', async () => {
//     const tempResCreator = new TemporaryResourseCreator(server);
//     const cookies = await tempResCreator.signIn();
//     const restaurantId = await tempResCreator.createRestaurant(cookies);
//
//     const sectionResponse = await request(server.callback())
//       .post(`/api/v1/restaurants/${restaurantId}/sections`)
//       .type('json')
//       .set('Cookie', cookies)
//       .send({ name: 'Second dish' });
//     const sectionId = sectionResponse.body.id;
//
//     const menuResponse = await request(server.callback())
//       .post(`/api/v1/restaurants/${restaurantId}/menus`)
//       .type('json')
//       .set('Cookie', cookies)
//       .send({ name: 'Main' });
//     const menuId = menuResponse.body.id;
//
//     const dish = {
//       name: 'Potato',
//       description: 'Good dish',
//       price: '$20.00',
//       photo: goodImg,
//       sectionId,
//       menuId,
//     };
//
//     const responsePost = await request(server.callback())
//       .post(`/api/v1/restaurants/${restaurantId}/dishes`)
//       .type('json')
//       .set('Cookie', cookies)
//       .send(dish);
//     expect(responsePost.status).toBe(201);
//     expect(responsePost.body).toMatchObject({
//       id: expect.any(Number)
//     });
//     const { id } = responsePost.body;
//
//     const responseGet = await request(server.callback())
//       .get(`/api/v1/restaurants/${restaurantId}/dishes/${id}`);
//     expect(responseGet.status).toBe(200);
//     expect(responseGet.body).toMatchObject({
//       ...dish,
//       id,
//       photo: expect.stringMatching(/^https?:\/\/.*$/),
//     });
//
//     const responseUpdate = await request(server.callback())
//       .put(`/api/v1/restaurants/${restaurantId}/dishes/${id}`)
//       .type('json')
//       .set('Cookie', cookies)
//       .send({ name: 'Better Potato' });
//     expect(responseUpdate.status).toBe(204);
//
//     const responseGet2 = await request(server.callback())
//       .get(`/api/v1/restaurants/${restaurantId}/dishes/${id}`);
//     expect(responseGet2.status).toBe(200);
//     expect(responseGet2.body).toMatchObject({
//       name: 'Better Potato'
//     });
//
//     const responseDelete = await request(server.callback())
//       .delete(`/api/v1/restaurants/${restaurantId}/dishes/${id}`)
//       .set('Cookie', cookies);
//     expect(responseDelete.status).toBe(204);
//
//     await request(server.callback())
//       .delete(`/api/v1/sections/${sectionId}`)
//       .set('Cookie', cookies);
//     await request(server.callback())
//       .delete(`/api/v1/menu/${menuId}`)
//       .set('Cookie', cookies);
//     await tempResCreator.deleteRestaurant(cookies, restaurantId);
//     await tempResCreator.deleteAcc(cookies);
//   });
// });
