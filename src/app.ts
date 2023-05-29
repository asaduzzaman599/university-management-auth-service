import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

     app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Testing Route
app.get('/', (req: Request, res: any) => {
  res.send({ Status: 'Success', message: 'Server is running' })
})

export default app
