import express from 'express';
import { UsersController } from './users.controller';
import validateRequest from '../../middlewares/validate-request';
import { UserValidation } from './user.validation';
const router = express.Router();

router
  .route('/create-user')
  .post(
    validateRequest(UserValidation.createUserSchema),
    UsersController.createUser
  );

export const UsersRouter = router;
