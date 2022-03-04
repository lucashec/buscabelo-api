import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import SessionService from '@modules/users/services/SessionService';
import FindByIdService from '@modules/users/services/FindByIdService';

export class UserController {
  private static INSTANCE: UserController;

  static getInstance(): UserController {
    if (!UserController.INSTANCE) {
      UserController.INSTANCE = new UserController();
    }
    return UserController.INSTANCE;
  }

  async UpdateUser(request: Request, response: Response) {

    const { id } = request.params;
    
    try {

      const updateUserService = container.resolve(UpdateUserService);
      const sessionService = container.resolve(SessionService);
      const findUserByIdService = container.resolve(FindByIdService);

      const foundUser = await findUserByIdService.execute(id)
      
      if (request.body.newPassword) {
        if(!request.body.oldPassword) {
          return response.status(400).json({
            success: false,
            message: "Old password is required"
          });  
        }
        await sessionService.execute({ email: foundUser.email, password: request.body.oldPassword })
      }

      const user = await updateUserService.execute({
        id,
        name: request.body.name,
        email: request.body.email,
        password: request.body.newPassword
      });

      return response.status(200).json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          type: user.type,
          email: user.email,
          avatar: user.avatar,
        }
      }); 

    } catch (err) {
      
      return response.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
  async UpdateAvatar(request: Request, response: Response) {
    try {
      const updateAvatar = container.resolve(UpdateAvatarService);
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file!.filename,
      });

      return response.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          type: user.type,
          email: user.email,
          avatar: user.avatar
        }
      });
    }
    catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
}
