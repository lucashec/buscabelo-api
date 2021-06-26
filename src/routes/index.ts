import {Router} from 'express';

import customerRouter from './customer.routes';
import providerRouter from './provider.routes';
import serviceRouter from './service.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/customers', customerRouter);
routes.use('/providers', providerRouter);
routes.use('/services', serviceRouter);
routes.use('/sessions', sessionRouter);

export default routes;
