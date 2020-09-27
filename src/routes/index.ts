import { Router } from 'express';

import employeeRouter from './employees.routes';
import courseRouter from './courses.routes';
import adminsRouter from './admins.routes';
import adminsLoginRouter from './adminsLogin.routes';
import trainingRouter from './training.routes';

const routes = Router();

routes.use('/employees', employeeRouter);
routes.use('/courses', courseRouter);
routes.use('/admins', adminsRouter);
routes.use('/login', adminsLoginRouter);
routes.use('/training', trainingRouter);

export default routes;
