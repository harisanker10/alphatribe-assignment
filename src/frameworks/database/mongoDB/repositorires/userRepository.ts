import { IUserRepository } from '@app/src/application/contracts/IUserRepository';
import { userModel } from '../models/userModel';
import { UserEntity } from '@app/src/entities/userEntity';

export class UserRepository implements IUserRepository {
  async createUser({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }): Promise<UserEntity> {
    return new userModel({ email, password, username })
      .save()
      .then((doc) => doc?.toObject() as UserEntity);
  }

  async getUserById(id: string): Promise<UserEntity | void> {
    return userModel.findById(id).then((doc) => doc?.toObject() as UserEntity);
  }

  async getUserByEmail(email: string): Promise<UserEntity | void> {
    return userModel
      .findOne({ email })
      .then((doc) => doc?.toObject() as UserEntity);
  }

  async updateBio(id: string, bio: string): Promise<UserEntity | void> {
    return userModel
      .findOneAndUpdate({ _id: id }, { bio }, { returnDocument: 'after' })
      .then((doc) => doc?.toObject() as UserEntity);
  }

  async updateUsername(
    id: string,
    username: string,
  ): Promise<UserEntity | void> {
    return userModel
      .findOneAndUpdate({ _id: id }, { username }, { returnDocument: 'after' })
      .then((doc) => doc?.toObject() as UserEntity);
  }

  async updateProfilePicture(
    id: string,
    profilePicture: string,
  ): Promise<UserEntity | void> {
    return userModel
      .findOneAndUpdate(
        { _id: id },
        { profilePicture },
        { returnDocument: 'after' },
      )
      .then((doc) => doc?.toObject() as UserEntity);
  }

  async getUserOrQuery({
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<UserEntity | void> {
    const options = [];
    if (id) {
      options.push({ _id: id });
    }
    if (email) {
      options.push({ email });
    }
    if (username) {
      options.push({ username });
    }
    return userModel
      .findOne({
        $or: options,
      })
      .then((doc) => doc?.toObject() as UserEntity);
  }

  async updateUserQuery(
    id: string,
    updates: { username: string; bio: string; profilePicture: string },
  ): Promise<UserEntity | void> {
    return userModel
      .findOneAndUpdate({ _id: id }, updates, { returnDocument: 'after' })
      .then((doc) => doc?.toObject() as UserEntity);
  }
}
