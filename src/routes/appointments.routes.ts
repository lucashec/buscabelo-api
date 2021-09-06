import {Router} from 'express';

import appointmentController from '../app/controllers/AppointmentController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.post('/', ensureAuthenticated, appointmentController.create);
appointmentRouter.get('/', ensureAuthenticated, appointmentController.getAll);
appointmentRouter.get('/:id', ensureAuthenticated, appointmentController.getById);
appointmentRouter.post('/:id/rate', appointmentController.createRating);
appointmentRouter.patch('/cancel/:id', ensureAuthenticated, appointmentController.update);
appointmentRouter.patch('/finish/:id', ensureAuthenticated, appointmentController.update);
export default appointmentRouter;