import { User } from './users.model'

export const findLastUserId = async (role: string): Promise<number> => {
  const user = await User.findOne({ role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return user?.id ? parseInt(user.id.slice(1)) : 0
}

export const generateUserId = async (role: string): Promise<string> => {
  const lastUSerId = await findLastUserId(role)
  const currentId = (lastUSerId + 1).toString().padStart(5, '0')

  if (role === 'student') return `${currentId}S`
  else if (role === 'faculty') return `${currentId}F`
  else return `${currentId}A`
}
