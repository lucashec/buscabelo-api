import {Router} from 'express';

import CustomerController from '../app/controllers/CustomerController';

const customerRouter = Router();

customerRouter.post('/', CustomerController.create);
customerRouter.get('/', CustomerController.getAll);

export default customerRouter;