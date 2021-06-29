import {Router} from 'express';

import customerRouter from './customer.routes';
import providerRouter from './provider.routes';
import serviceRouter from './service.routes';
import sessionRouter from './sessions.routes';
import appointmentRouter from './appointments.routes';
const routes = Router();

routes.use('/v1/customers', customerRouter);
routes.use('/v1/providers', providerRouter);
routes.use('/v1/services', serviceRouter);
routes.use('/v1/sessions', sessionRouter);
routes.use('/v1/appointments', appointmentRouter);

export default routes;
