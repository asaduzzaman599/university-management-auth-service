import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import globalErrorHandler from './app/middlewares/global-error-hanlder';
import routes from './app/routes';
import httpStatus from 'http-status';
import { UsersRouter } from './app/modules/users/users.route';
import { AcademicSemesterRoute } from './app/modules/academic-semester/academic-semester.route';
import { AcademicFacultyRoute } from './app/modules/academic-faculty/academic-faculty.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Routes
// console.log(app.get('env'))
// console.log(process.env)
/* 
app.use('/api/v1/users', UsersRouter);
app.use('/api/v1/academic-semester', AcademicSemesterRoute);
app.use('/api/v1/academic-faculty', AcademicFacultyRoute); */
//replaced with
app.use('/api/v1/', routes);

//Testing Route
app.get('/', async (req: Request, res: Response) => {
  res.send({ Status: 'Success', message: 'Server is running' });
  // Promise.reject(new Error('Unhandled Promise Rejection'))
  //throw new Error(" Testing Error Handle")
});

//global Error Handler
app.use(globalErrorHandler);

app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Not Found',
      },
    ],
  });
});

export default app;
