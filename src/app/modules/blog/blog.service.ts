import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { TUser } from '../user/user.interface';

const createBlogIntoDb = async (payload: TBlog, authorMail: string) => {
  const author = await User.findOne({ email: authorMail });
  if (!author) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Author not found');
  }
  const blog = await Blog.create({
    ...payload,
    author: author._id,
    isPublished: true,
  });

  const blogWithAuthor = await Blog.findById(blog._id)
    .populate('author', 'name email')
    .select('_id title content author');
  return blogWithAuthor;
};

const updateBlogIntoDb = async (
  id: string,
  updateData: Partial<TBlog>,
  requestEmail: string,
) => {
  const blog = await Blog.findById(id).populate<{ author: Partial<TUser> }>(
    'author',
    'name email',
  );
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (requestEmail !== blog.author.email) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  })
    .populate('author', 'name email')
    .select('_id title content author');

  return updatedBlog;
};

export const BlogServices = {
  createBlogIntoDb,
  updateBlogIntoDb,
};
