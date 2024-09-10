import { UserEntity } from '@app/src/entities/userEntity';

export interface IUserRepository {
  createUser({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }): Promise<UserEntity>;

  getUserByEmail(email: string): Promise<UserEntity | void>;
  getUserById(id: string): Promise<UserEntity | void>;
  getUserOrQuery({
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<UserEntity | void>;

  updateUsername(id: string, username: string): Promise<UserEntity | void>;
  updateBio(id: string, bio: string): Promise<UserEntity | void>;
  updateProfilePicture(
    id: string,
    profilePicture: string,
  ): Promise<UserEntity | void>;
  updateUserQuery(
    id: string,
    updates: { username: string; bio: string; profilePicture: string },
  ): Promise<UserEntity | void>;
}
