import { Types } from 'mongoose';

type TBlog = {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished: boolean;
};
