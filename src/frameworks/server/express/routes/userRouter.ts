import { IUserRepository } from '@app/src/application/contracts/IUserRepository';
import { UserController } from '@app/src/controllers/userController';
import { Router } from 'express';
import { protectRoute } from '../middlewares/authMiddleware';
import { Request, Response, NextFunction } from 'express';

export function UserRouter(userRepository: IUserRepository) {
  const userController = UserController(userRepository);
  const router = Router();
  router.route('/profile/:userId').get(protectRoute, userController.getProfile);
  router.route('/profile').put(protectRoute, userController.updateUserDetails);
  return router;
}
