import {Router} from 'express';
import multer from 'multer';
import UserController from '../app/controllers/UserController';
import uploadingConfig from '../config/upload';
import ProviderController from '../app/controllers/ProviderController';
import EnsureAuthenticated from '../middlewares/ensureAuthenticated';

const providerRouter = Router();
const upload =  multer(uploadingConfig);

providerRouter.get('/search', ProviderController.filterName);
providerRouter.get('/:id/services', ProviderController.getServices);
providerRouter.get('/:id/appointments', ProviderController.getAppointments);
providerRouter.get('/:id', ProviderController.getById);
providerRouter.get('/', ProviderController.getAll);
providerRouter.post('/', ProviderController.create);
providerRouter.patch('/avatar',
EnsureAuthenticated,
upload.single('avatar'),
UserController.UpdateAvatar);

export default providerRouter;