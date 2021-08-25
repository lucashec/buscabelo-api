import {Router} from 'express';
import multer from 'multer';
import uploadingConfig from '../config/upload';
import CustomerController from '../app/controllers/CustomerController';
import UserController from '../app/controllers/UserController';
import EnsureAuthenticated from '../middlewares/ensureAuthenticated';

const customerRouter = Router();
const upload =  multer(uploadingConfig);

customerRouter.post('/', CustomerController.create);
customerRouter.post('/googleAuth', CustomerController.googleSignIn);
customerRouter.get('/', CustomerController.getAll);
customerRouter.get('/:id/appointments', CustomerController.getAppointments);
customerRouter.patch('/avatar',
EnsureAuthenticated,
upload.single('avatar'),
UserController.UpdateAvatar);

export default customerRouter;