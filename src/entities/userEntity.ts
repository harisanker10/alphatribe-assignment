export interface UserEntity {
  id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string | undefined;
  bio?: string | undefined;
  createdAt: number;
  updatedAt: number;
}
