import express from 'express';
import { AcademicSemesterRoute } from '../modules/academic-semester/academic-semester.route';
import { UsersRouter } from '../modules/users/users.route';

const modulesRoute = [
  { path: '/users', route: UsersRouter },
  { path: '/academic-semester', route: AcademicSemesterRoute },
];

const routes = express.Router();
modulesRoute.forEach(route => routes.use(route.path, route.route));
/* routes.use('/users', UsersRouter);
routes.use('/academic-semester', AcademicSemesterRoute);
 */
export default routes;
