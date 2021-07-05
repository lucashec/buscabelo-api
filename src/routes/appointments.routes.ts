import {Router} from 'express';

import appointmentController from '../app/controllers/AppointmentController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.post('/', ensureAuthenticated, appointmentController.create);
appointmentRouter.get('/', ensureAuthenticated, appointmentController.getAll);
appointmentRouter.get('/:id', ensureAuthenticated, appointmentController.getById);
export default appointmentRouter;