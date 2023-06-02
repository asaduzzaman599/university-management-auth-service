import config from '../../../config'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utilts'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.DEFAULT_USER_PASSWORD as string
  }
  user.id = await generateUserId(user.role)

  const createdUser = await User.create(user)
  if (!user) {
    throw new Error('Failed to create user!')
  }
  return createdUser
}

export default {
  createUser,
}
