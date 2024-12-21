import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};

export interface UserModel extends Model<TUser> {
  // is user exists by email
  isUserExists(email: string): Promise<boolean>;
}
