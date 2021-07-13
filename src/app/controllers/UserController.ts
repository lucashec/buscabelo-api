import { Request, Response } from 'express';
import UpdateAvatarService  from '../services/UpdateAvatarService';

class UserController{

  async UpdateAvatar (request: Request, response: Response){
    try{
      const updateAvatar = new UpdateAvatarService();

      const user =await updateAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file?.filename,
      })
      return response.json(user);
    }
    catch (err){
      return response.status(400).json({
        error: err.message
      })
    }
   
  }
}

export default new UserController();