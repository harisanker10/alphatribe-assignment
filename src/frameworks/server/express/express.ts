import 'express-async-errors';
import {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import { initRoutes } from './routes/router';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { NotFoundException } from '../../errors/NotFoundException';
export function configureExpress(app: Express) {
  app.use(json());
  app.use(urlencoded({ limit: '10mb', extended: true }));
  app.use('/api', initRoutes());
  app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new NotFoundException());
  });
  app.use(errorHandler);
}
