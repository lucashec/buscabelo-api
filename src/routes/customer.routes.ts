import {Router} from 'express';
import UserController from '../app/controllers/UserController';


const customerRouter = Router();

customerRouter.post('/', UserController.create);
customerRouter.get('/', UserController.getAll);

export default customerRouter;