import { Request, Response } from 'express';
import { IUserRepository } from '../application/contracts/IUserRepository';
import { IAuthService } from '../application/contracts/IAuthService';
import { AuthUseCase } from '../application/useCases/authUseCase';
require('express-async-errors');

export function authController(
  userRepository: IUserRepository,
  authService: IAuthService,
) {
  const authUseCase = AuthUseCase(userRepository, authService);
  return {
    async register(req: Request, res: Response) {
      const id = await authUseCase.register(req.body);
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        userId: id,
      });
    },
    async login(req: Request, res: Response) {
      const {
        token,
        user: { id, username, email },
      } = await authUseCase.login(req.body);
      res.status(200).json({ token, user: { id, username, email } });
    },
  };
}
