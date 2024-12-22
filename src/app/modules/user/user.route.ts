import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/register',
  validateRequest(UserValidation.registerUserValidationSchema),
  UserControllers.createUser,
);

router.post(
  '/login',
  validateRequest(UserValidation.loginValidationSchema),
  UserControllers.loginUser,
);
export const UserRoutes = router;
// todo
