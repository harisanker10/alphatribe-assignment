import { IAuthService } from '@app/src/application/contracts/IAuthService';
import { env } from '@app/src/config/env';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

export class AuthService implements IAuthService {
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload: Record<string, any>): string {
    return sign(payload, env.JWT_SECRET);
  }

  verifyToken(token: string): Record<string, any> | null {
    return verify(token, env.JWT_SECRET) as Record<string, any> | null;
  }
}
