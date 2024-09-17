import 'express-async-errors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { initRoutes } from './routes/router';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import { NotFoundException } from '../../errors/NotFoundException';

export class ExpressApp {
  private readonly app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.app.use(errorHandler);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }));
  }

  routes() {
    this.app.use('/api', initRoutes());
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      next(new NotFoundException('Route not found'));
    });
  }

  getInstance() {
    return this.app;
  }
}
