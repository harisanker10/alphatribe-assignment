import { Router } from 'express';
import { AuthRouter } from './authRouter';
import { UserRepository } from '@app/src/frameworks/database/mongoDB/repositorires/userRepository';
import { AuthService } from '@app/src/frameworks/services/authService';
import { UserRouter } from './userRouter';

export function initRoutes() {
  const router = Router();

  const userRepository = new UserRepository();
  const authService = new AuthService();

  const authRouter = AuthRouter(userRepository, authService);
  const userRouter = UserRouter(userRepository);
  router.use('/auth', authRouter);
  router.use('/user', userRouter);

  return router;
}
