import 'express-async-errors';
import { startServer } from './frameworks/server/startServer';
import { env } from './config/env';
import { createServer } from 'http';
import { mongoDbConnection } from './frameworks/database/mongoDB/connection';
import { ExpressApp } from './frameworks/server/express/application';
import { SocketApplication } from './frameworks/server/socket/application';

const expressApp = new ExpressApp();

const bootstrap = async () => {
  await mongoDbConnection().connectToMongo();
  const server = createServer(expressApp.getInstance());
  SocketApplication.getInstance();
  SocketApplication.attach(server);
  startServer(server, parseInt(env.PORT));
};
bootstrap();

//TODO: - Image parsing for users (form data)
