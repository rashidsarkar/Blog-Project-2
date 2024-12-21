import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);
  // console.log(result, 'from user controler');
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
export const UserControllers = {
  createUser,
};
