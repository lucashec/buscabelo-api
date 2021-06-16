import {Router} from 'express';

import ServiceController from '../app/controllers/ServiceController';

const serviceRouter = Router();

serviceRouter.post('/', ServiceController.create);
serviceRouter.get('/', ServiceController.getAll);
serviceRouter.get('/:id', ServiceController.getById);
serviceRouter.put('/:id', ServiceController.update);
serviceRouter.delete('/:id', ServiceController.remove);

export default serviceRouter;