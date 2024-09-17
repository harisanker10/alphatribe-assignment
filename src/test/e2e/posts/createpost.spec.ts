import request from 'supertest';
import { env } from '@app/src/config/env';
import { Server } from 'http';
import mongoose from 'mongoose';
import { ExpressApp } from '@app/src/frameworks/server/express/application';

const app = new ExpressApp().getInstance();
let server: Server;
beforeAll(async () => {
  await mongoose.connect(env.MONGO_TEST_URI);
  await mongoose.connection.db?.dropDatabase();
  server = app.listen(env.PORT, () => console.log('listening at %d', env.PORT));
});
afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  mongoose.disconnect();
  server.close();
});

const createPost = async (postData: Record<string, any>) => {
  return await request(app).post('/api/posts').send(postData);
};

describe('Post Creation', () => {
  it('It should not create a new post without token header', async () => {
    const post = {};
    const result = await createPost(post);
    expect(result.statusCode).toBe(403); // Bad Request
  });
});
