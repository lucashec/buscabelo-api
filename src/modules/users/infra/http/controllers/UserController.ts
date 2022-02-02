import { Request, Response } from 'express';
import UpdateAvatarService from '@modules/users/services/UpdateAvatarService';
import UserRepository from '../../typeorm/repositories/UserRepository';
import S3StorageProvider from '@shared/containers/providers/StorageProvider/implementations/S3StorageProvider';

export class UserController {
  private static INSTANCE : UserController;

  static getInstance(): UserController{
    if (!UserController.INSTANCE){
      UserController.INSTANCE = new UserController();
    }
    return UserController.INSTANCE;
  }

  async UpdateAvatar(request: Request, response: Response) {
    const userRepository = new UserRepository();
    const storageRepository = new S3StorageProvider();
    try {
      const updateAvatar = new UpdateAvatarService(userRepository, storageRepository);
      const user = await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file!.filename,
      });

      return response.json({
        success: true,
        user
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

