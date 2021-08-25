import { Request, Response } from 'express';

import SessionService from '../services/SessionService';

class SessionController {
  async create(request: Request, response: Response) {
    try {
      const sessionService = new SessionService();
      const { email, password } = request.body;
      const { user, token } = await sessionService.execute({
        email,
        password
      });

      return response.status(200).json({
        success: true,
        token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}

export default new SessionController();