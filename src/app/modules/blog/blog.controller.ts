import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';

import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BlogServices } from './blog.service';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blogData = req.body;
  const author = req.tokenUser.email;
  const result = await BlogServices.createBlogIntoDb(blogData, author);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const requestEmail = req.tokenUser.email;
  const { id } = req.params;
  const result = await BlogServices.updateBlogIntoDb(
    id,
    req.body,
    requestEmail,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});
export const BlogControllers = {
  createBlog,
  updateBlog,
};