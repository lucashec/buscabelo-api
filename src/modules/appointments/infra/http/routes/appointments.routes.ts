import {Router} from 'express';

<<<<<<< HEAD
import appointmentController from '../app/controllers/AppointmentController';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.post('/', ensureAuthenticated, appointmentController.create);
appointmentRouter.get('/', ensureAuthenticated, appointmentController.getAll);
appointmentRouter.get('/:id', ensureAuthenticated, appointmentController.getById);
appointmentRouter.patch('/cancel/:id', ensureAuthenticated, appointmentController.update);
appointmentRouter.patch('/finish/:id', ensureAuthenticated, appointmentController.update);
=======
import {AppointmentController} from '@modules/appointments/infra/http/controllers/AppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();
const controller = AppointmentController.getInstance();

appointmentRouter.post('/', ensureAuthenticated, controller.create);
appointmentRouter.get('/', ensureAuthenticated, controller.getAll);
appointmentRouter.get('/:id', ensureAuthenticated, controller.getById);
appointmentRouter.patch('/cancel/:id', ensureAuthenticated, controller.update);
appointmentRouter.patch('/finish/:id', ensureAuthenticated, controller.update);
>>>>>>> master
export default appointmentRouter;