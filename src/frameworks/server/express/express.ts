import { Express, json, urlencoded } from 'express';
import { initRoutes } from './routes/router';
export function configureExpress(app: Express) {
  app.use(json());
  app.use(urlencoded({ limit: '10mb', extended: true }));
  app.use('/api', initRoutes());
}
