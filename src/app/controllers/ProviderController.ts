import { Request, Response } from 'express';

import ProviderService from '../services/ProviderService';

class ProviderController{

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

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const customerService = new ProviderService();

      const service = await customerService.findOne(id)

      return response.status(200).json({
        message: "Service found!",
        data: service
      });

    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async getServices(request: Request, response: Response){
    try {
      const { id } = request.params;
      const service = new ProviderService();
      
      const services = await service.findServicesProvider(id);

      return response.status(200).json({
        message: "Services found!",
        data: services
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async getAppointments(request: Request, response: Response){
    try {
      const { id } = request.params;
      const service = new ProviderService();
      
      const appointments = await service.findAppointmentsProvider(id);

      return response.status(200).json(appointments.map(
        appointment => (
          {appointment:{
            id:appointment?.id,
            scheduled_at: appointment?.scheduled_at,
            appointment_to: appointment?.appointment_to,
            time_done_at: appointment?.time_done_at,
            canceled_at: appointment?.canceled_at,
            provider:{
              id: appointment?.provider.id,
              name: appointment?.provider.name,
            },
            customer:{
              id: appointment?.customer.id,
              name: appointment?.customer.name,
            },
            service:{
              id: appointment?.service.id,
              name: appointment?.service.description,
              value: appointment?.service.value,
            }
          }}
        )
      ));
       
    } catch (err) {
      return response.status(400).json({ error: err.message });
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

export default new ProviderController();