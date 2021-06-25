import {Router} from 'express';
import appointmentController from '../app/controllers/AppointmentController';

const appointmentRouter = Router();

appointmentRouter.post('/', appointmentController.create);
appointmentRouter.get('/', appointmentController.getAll);

export default appointmentRouter;