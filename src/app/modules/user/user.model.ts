import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
// userSchema.pre('save', async function (next) {
//   try {
//     const isUserExists = await User.findOne({ email: this.email });
//     // console.log(isUserExists);
//     if (isUserExists) {
//       return next(
//         new AppError(StatusCodes.CONFLICT, 'Email is already in use'),
//       );
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// });

userSchema.statics.isUserExists = async function (email: string) {
  const user = await User.findOne({ email });
  // console.log(user);
  return user;
};

export const User = model<TUser, UserModel>('User', userSchema);
