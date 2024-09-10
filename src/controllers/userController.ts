import { NextFunction, Request, Response } from 'express';
import { IUserRepository } from '../application/contracts/IUserRepository';
import { UserUseCase } from '../application/useCases/userUseCase';

export function UserController(userRepository: IUserRepository) {
  const userUseCase = UserUseCase(userRepository);
  return {
    async getProfile(req: Request, res: Response) {
      const userId = req.params.userId;
      const userDetails = await userUseCase.getUserProfile(userId);
      res.status(200).json(userDetails);
    },

    async updateUserDetails(req: Request, res: Response) {
      if (req.user && req.user.id) {
        const { id: userId } = req.user;
        await userUseCase.updateProfile(userId, req.body);
        res.status(200).json({ success: true, message: 'Profile updated' });
      }
    },
  };
}
