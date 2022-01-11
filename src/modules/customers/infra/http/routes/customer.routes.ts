import {Router} from 'express';
import multer from 'multer';
import uploadingConfig from '@config/upload';
import { CustomerController } from '@modules/customers/infra/http/controllers/CustomerController';
import {UserController} from '@modules/users/infra/http/controllers/UserController';
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const customerRouter = Router();
const upload =  multer(uploadingConfig);
const controller = CustomerController.getInstance();
<<<<<<< HEAD
const userController = UserController.getInstance();
=======
//const userController = UserController.getInstance();
>>>>>>> master

customerRouter.post('/', controller.create);
customerRouter.get('/', controller.getAll);
customerRouter.get('/:id/appointments', controller.getAppointments);
<<<<<<< HEAD
customerRouter.patch('/avatar', 
EnsureAuthenticated,
upload.single('avatar'),
userController.UpdateAvatar);
=======
// customerRouter.patch('/avatar', 
// EnsureAuthenticated,
// upload.single('avatar'),
// userController.UpdateAvatar);
>>>>>>> master

export default customerRouter;