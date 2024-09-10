import isEmail from 'validator/lib/isEmail';
import { isStrongPassword } from 'validator';
import { UseCaseError } from '../errors/useCaseError';
import { IAuthService } from '../contracts/IAuthService';
import { IUserRepository } from '../contracts/IUserRepository';

export function AuthUseCase(
  userRepository: IUserRepository,
  authService: IAuthService,
) {
  return {
    async register({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) {
      if (!isEmail(email)) {
        throw new UseCaseError('Invalid email', 400);
      }
      if (
        !isStrongPassword(password, {
          minLength: 8,
          minNumbers: 1,
          minUppercase: 1,
          minLowercase: 1,
          minSymbols: 1,
        })
      ) {
        throw new UseCaseError(
          'Password must contain at least 8 characters and include at least one lowercase letter, one uppercase letter, and one symbol',
          400,
        );
      }

      if (username.length < 3) {
        throw new UseCaseError(
          'Username should contain atleast 3 characters',
          400,
        );
      }

      const existingUser = await userRepository.getUserOrQuery({
        username,
        email,
      });
      if (existingUser) {
        throw new UseCaseError('User already exist', 409);
      }
      const hashedPassword = await authService.encryptPassword(password);
      const { id } = await userRepository.createUser({
        email,
        username,
        password: hashedPassword,
      });

      return id;
    },

    async login({ email, password }: { email: string; password: string }) {
      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        throw new UseCaseError('User not found', 404);
      }
      const valid = await authService.compare(password, user.password);
      if (!valid) {
        throw new UseCaseError('Invalid Password', 403);
      }
      const token = authService.generateToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });
      const { password: _password, ...userDetails } = user;
      return { user: userDetails, token };
    },
  };
}
