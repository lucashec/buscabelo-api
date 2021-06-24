import { Request, Response } from 'express';

import SessionService from '../services/SessionService';

class SessionController {

  async create(request: Request, response: Response){
    try{
      const sessionService = new SessionService();

      const {email, password} =  request.body;
  
      const {user, token} = await sessionService.execute({
        email,
        password
      });
  
      return response.status(200).json({user, token});
    } catch (err){
      return response.status(400).json({err: err.message});
    }
  }
}

export default new SessionController();