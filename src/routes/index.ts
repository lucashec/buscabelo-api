import {Router} from 'express';
import customerRouter from './customer.routes';
import serviceRouter from './service.routes';

const routes = Router();

routes.use('/customer', customerRouter);
routes.use('/service', serviceRouter);

export default routes;
