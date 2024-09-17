import { UseCaseError } from '@app/src/application/errors/useCaseError';
import { NotFoundException } from '@app/src/frameworks/errors/NotFoundException';
import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('[ErrorHandler]:', err.message);
  if (err instanceof UseCaseError) {
    res
      //@ts-ignore
      .status(err.code || 400)
      .json({ success: false, message: err.message });
  }
  if (err instanceof NotFoundException) {
    res.status(404).json({ success: false, message: err.message });
  }
  res.status(400).json({ success: false, message: 'Something went wrong' });
}
