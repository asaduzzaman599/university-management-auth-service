import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './users.interface';
import { User } from './users.model';
import { generateUserId } from './users.utilts';

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.DEFAULT_USER_PASSWORD as string;
  }
  user.id = await generateUserId(user.role);

  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UsersService = {
  createUser,
};
