import express from 'express';
import { AcademicSemesterRoute } from '../modules/academic-semester/academic-semester.route';
import { UsersRouter } from '../modules/users/users.route';
import { AcademicFacultyRoute } from '../modules/academic-faculty/academic-faculty.route';
import { AcademicDepartmentRoute } from '../modules/academic-department/academic-department.route';

const modulesRoute = [
  { path: '/users', route: UsersRouter },
  { path: '/academic-semester', route: AcademicSemesterRoute },
  { path: '/academic-faculty', route: AcademicFacultyRoute },
  { path: '/academic-department', route: AcademicDepartmentRoute },
];

const routes = express.Router();
modulesRoute.forEach(route => routes.use(route.path, route.route));
/* routes.use('/users', UsersRouter);
routes.use('/academic-semester', AcademicSemesterRoute);
 */
export default routes;
