import {Router} from 'express';

import ProviderController from '../app/controllers/ProviderController';

const route = Router();

route.get('/search', ProviderController.filterName);
route.get('/', ProviderController.getAll);
route.post('/', ProviderController.create);

export default route;