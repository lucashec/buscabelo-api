import { Request, Response } from 'express';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';

export class UserController {
  private userRepository : UserRepository;
  private static INSTANCE : UserController;

  constructor(){
    this.userRepository = new UserRepository();
  }  
   
   static getInstance(): UserController{
    if (!UserController.INSTANCE){
      UserController.INSTANCE = new UserController();
    }
    return UserController.INSTANCE;
  }

  async UpdateAvatar(request: Request, response: Response) {
    try {
      const updateAvatar = new UpdateAvatarService(this.userRepository);
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file?.filename,
      });

      return response.json({
        success: true,
        user: user
      });
    }
    catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }

  }
}

