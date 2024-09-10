export interface IAuthService {
  encryptPassword(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;

  generateToken(payload: Record<string, any>): string;
  verifyToken(token: string): Record<string, any> | null;
}
