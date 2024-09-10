import { IAuthService } from '@app/src/application/contracts/IAuthService';
import { IUserRepository } from '@app/src/application/contracts/IUserRepository';
import { authController } from '@app/src/controllers/authController';
import { Router } from 'express';

export function AuthRouter(
  userRepository: IUserRepository,
  authService: IAuthService,
) {
  const controller = authController(userRepository, authService);
  const router = Router();
  router.route('/register').post(controller.register);
  router.route('/login').post(controller.login);
  return router;
}
