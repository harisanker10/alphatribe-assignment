import { AuthService } from '@app/src/frameworks/services/authService';
import { UserPayload } from '@app/src/types/express';
import { NextFunction, Request, Response } from 'express';

export function protectRoute(req: Request, res: Response, next: NextFunction) {
  const authHeader = (req.headers['Authorization'] ||
    req.headers['authorization']) as string | undefined;
  if (!authHeader) {
    res.status(403).json('Not authorized');
    return;
  }
  const token = authHeader?.split(' ')[1];
  if (!token) {
    res.status(403).json('Not authorized');
    return;
  }
  const authService = new AuthService();
  const payload = authService.verifyToken(token);
  req['user'] = payload as UserPayload;
  next();
}
