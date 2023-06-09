import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/global-error-hanlder';
import { UsersRouter } from './app/modules/users/users.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Routes
// console.log(app.get('env'))
// console.log(process.env)

app.use('/api/v1/users', UsersRouter);

//Testing Route
app.get('/', async (req: Request, res: Response) => {
  res.send({ Status: 'Success', message: 'Server is running' });
  // Promise.reject(new Error('Unhandled Promise Rejection'))
  //throw new Error(" Testing Error Handle")
});

//global Error Handler
app.use(globalErrorHandler);

export default app;
