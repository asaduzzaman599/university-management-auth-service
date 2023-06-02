import { Request, Response } from 'express'
import usersService from './users.service'
const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    return res
      .status(200)
      .json({
        success: true,
        data: result,
        message: 'User created Successfully!',
      })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create User!' })
  }
}

export default {
  createUser,
}
