import {Router} from 'express';

import {AppointmentController} from '@modules/appointments/infra/http/controllers/AppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();
const controller = AppointmentController.getInstance();

appointmentRouter.post('/', ensureAuthenticated, controller.create);
appointmentRouter.get('/confirm/:id', controller.confirmAppointment);
appointmentRouter.get('/', ensureAuthenticated, controller.getAll);
appointmentRouter.get('/:id', ensureAuthenticated, controller.getById);
appointmentRouter.patch('/cancel/:id', ensureAuthenticated, controller.cancel);
appointmentRouter.patch('/finish/:id', ensureAuthenticated, controller.finish);
export default appointmentRouter;