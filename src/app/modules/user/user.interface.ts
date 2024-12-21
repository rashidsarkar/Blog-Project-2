/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
};
export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  // is user exists by email
  isUserExists(email: string): Promise<boolean>;
  isPasswordMatch(plainTextPass: string, hashedPass: string): Promise<boolean>;
}
