import {Router} from 'express';

import ServiceController from '../app/controllers/ServiceController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const serviceRouter = Router();
//serviceRouter.use(ensureAuthenticated);

serviceRouter.get('/buscar', ServiceController.filterName);
serviceRouter.get('/', ServiceController.getAll);
serviceRouter.get('/:id', ServiceController.getById);
serviceRouter.post('/', ServiceController.create);
serviceRouter.put('/:id', ServiceController.update);
serviceRouter.delete('/:id', ServiceController.remove);

export default serviceRouter;