import { Request, Response } from 'express';

import ProviderService from '../services/ProviderService';

class CustomerController{

  async getAll(request: Request, response: Response){
    try{
      const service = new ProviderService();

      const providers = await service.find()

      return response.status(200).json({
        message: "Providers found!",
        data: providers
      });

    }catch(err){
      return response.status(400).json({error : err.message});
    }
  }

  async filterName(request: Request, response: Response) {
    try {
      let name = request.query["name"];
      
      const providerService = new ProviderService();

      const providers = await providerService.filterName(name);

      return response.status(200).json({
        message: "Providers found!",
        data: providers
      });

    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }

  async create(request: Request, response: Response){
    try{
      const service = new ProviderService();

      const {name, email, password} =  request.body;
  
      const provider = await service.execute({
        name,
        email,
        password 
      });
      
      return response.status(200).json({
        message: "Provider Created!",
        data: provider
      });
    } catch (err){
      return response.status(400).json({error : err.message});
    }
  }
}

export default new CustomerController();