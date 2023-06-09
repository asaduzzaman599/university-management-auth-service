import { RequestHandler } from 'express';
import { UsersService } from './users.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;

    const result = await UsersService.createUser(user);
    return res.status(200).json({
      success: true,
      data: result,
      message: 'User created Successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const UsersController = {
  createUser,
};
