import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

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
    .select('id title content author');
  return blogWithAuthor;
};

const updateBlogIntoDb = async (id, updateData, requestEmail) => {
  console.log(id, updateData, requestEmail);
  // have to work on this tomorow
};
export const BlogServices = {
  createBlogIntoDb,
  updateBlogIntoDb,
};
