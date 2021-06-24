import {Router} from 'express';

import customerRouter from './customer.routes';
import serviceRouter from './service.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/customers', customerRouter);
routes.use('/services', serviceRouter);
routes.use('/sessions', sessionRouter);

export default routes;
