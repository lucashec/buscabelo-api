import { Request, Response } from 'express';

import CustomerService from '../services/CustomerService';

class CustomerController{

  async getAll(request: Request, response: Response){
    try{
      const customerService = new CustomerService();

      const users = await customerService.find()

      return response.status(200).json({
        message: "users found!",
        data: users
      });

    }catch(err){
      return response.status(400).json({error : err.message});
    }
  }

  async create(request: Request, response: Response){
    try{
      const customerService = new CustomerService();

      const {name, email, password} =  request.body;
  
      const user = await customerService.execute({
        name,
        email,
        password 
      });
      
      return response.status(200).json({
        message: "user Created!",
        data: user
      });
    } catch (err){
      return response.status(400).json({error : err.message});
    }
  }
}

export default new CustomerController();