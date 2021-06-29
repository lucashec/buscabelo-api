import {Router} from 'express';

import ServiceController from '../app/controllers/ServiceController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const serviceRouter = Router();

serviceRouter.get('/search', ServiceController.filterName);
serviceRouter.get('/', ensureAuthenticated, ServiceController.getAll);
serviceRouter.get('/:id', ServiceController.getById);
serviceRouter.post('/', ensureAuthenticated, ServiceController.create);
serviceRouter.put('/:id', ensureAuthenticated, ServiceController.update);
serviceRouter.delete('/:id', ensureAuthenticated, ServiceController.remove);

export default serviceRouter;