import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogControllers } from './blog.controller';
import { USER_ROLE } from '../user/user.const';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogControllers.createBlog,
);
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

export const BlogRoutes = router;