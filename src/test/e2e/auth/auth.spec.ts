import request from 'supertest';
import { app } from '@app/src/main';

describe('Authentication', () => {
  test('It creates a new user', async () => {
    let result = await request(app).post('/api/auth/register').send({
      username: 'johndoe69',
      email: 'johndoe@gmail.com',
      password: 'Password@123',
    });
    expect(result.statusCode).toBe(201);
  });
});
// describe('POST APIs', () => {
//   test('It should create user', async () => {
//     let result = await request(app).post('/create-user').send({
//       username: 'Abid',
//       password: '1234',
//     });
//
//     expect(result.body).toEqual({
//       username: 'Abid',
//       password: '1234',
//     });
//     expect(result.statusCode).toBe(200);
//   });
// });
