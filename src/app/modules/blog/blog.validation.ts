import { Types } from 'mongoose';
import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    content: z.string({
      required_error: 'Content is required',
    }),
    author: z
      .string()
      .refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid author ID',
      })
      .optional(),
    isPublished: z.boolean().default(true),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
