import { Request, Response } from 'express';
import CreateServiceHelper from '../services/CreateServiceHelper';

class ServiceController {
  async create(request: Request, response: Response) {
    try{
      const {name, description, value, provider} =  request.body;
  
      const createService = new CreateServiceHelper();
  
      const service = await createService.execute({
        name,
        description,
        value,
        provider,
      })
  
      return response.status(200).json({
        message: "service Created!",
        data: service
      });
    } catch (err){
      return response.status(400).json({error : err.message});
    }
  }
}

export default new ServiceController();