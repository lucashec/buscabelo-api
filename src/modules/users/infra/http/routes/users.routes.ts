import {Router} from 'express';
import {UserController} from '@modules/users/infra/http/controllers/UserController';

const userRouter = Router();
const controller = UserController.getInstance();

userRouter.patch('/:id', controller.UpdateUser);

export default userRouter;