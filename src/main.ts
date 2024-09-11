import express from 'express';
import { configureExpress } from './frameworks/server/express/express';
import { startServer } from './frameworks/server/startServer';
import { env } from './config/env';
import { createServer } from 'http';
import { mongoDbConnection } from './frameworks/database/mongoDB/connection';

const bootstrap = async () => {
  const app = express();
  await mongoDbConnection().connectToMongo();
  configureExpress(app);
  const server = createServer(app);
  startServer(server, parseInt(env.PORT));
  return app;
};
bootstrap();
export { bootstrap };
