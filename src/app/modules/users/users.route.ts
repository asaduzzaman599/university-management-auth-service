import express from 'express'
import usersController from './users.controller'
const router = express.Router()

router.route('/create-user').post(usersController.createUser)

export default router
