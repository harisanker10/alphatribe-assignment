import { IUserRepository } from '../contracts/IUserRepository';
import { UseCaseError } from '../errors/useCaseError';

export function UserUseCase(userRepository: IUserRepository) {
  return {
    async getUserProfile(id: string) {
      const user = await userRepository.getUserById(id);
      if (!user) throw new UseCaseError('User not found', 404);
      const { password, ...userDetails } = user;
      return userDetails;
    },

    async updateProfile(
      id: string,
      updates: { username: string; bio: string; profilePicture: string },
    ) {
      const updatedUser = await userRepository.updateUserQuery(id, updates);
      if (!updatedUser) throw new UseCaseError('User not found', 404);
      const { password, ...userDetails } = updatedUser;
      return userDetails;
    },
  };
}
