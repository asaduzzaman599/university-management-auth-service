import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import userRouter from './app/modules/users/users.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application Routes

app.use('/api/v1/users', userRouter)

//Testing Route
app.get('/', (req: Request, res: Response) => {
  res.send({ Status: 'Success', message: 'Server is running' })
})

export default app
