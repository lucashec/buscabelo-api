import {Router} from 'express';

import ServiceController from '../app/controllers/ServiceController';

const serviceRouter = Router();

serviceRouter.post('/', ServiceController.create)

export default serviceRouter;