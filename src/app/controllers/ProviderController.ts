import { Request, Response } from 'express';

import ProviderService from '../services/ProviderService';
import CustomerService from '../services/CustomerService';
import SessionService from '../services/SessionService';

class ProviderController {
  async getAll(request: Request, response: Response) {
    try {
      const providerService = new ProviderService();

      const providers = await providerService.find()

      return response.status(200).json({
        success: true,
        providers: providers.map(provider => ({
          id: provider.id,
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        })
        )
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async filterName(request: Request, response: Response) {
    try {
      let name = request.query["name"];

      const providerService = new ProviderService();

      const providers = await providerService.filterName(name);

      return response.status(200).json({
        success: true,
        providers: providers.map(provider => ({
          id: provider.id,
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        })
        )
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const providerService = new ProviderService();

      const provider = await providerService.findOne(id)

      return response.status(200).json({
        success: true,
        provider: {
          id: provider.id,
          name: provider.name,
          address: provider.address,
          description: provider.description,
          email: provider.email,
          rating: provider.rating_average
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getServices(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const providerService = new ProviderService();

      const services = await providerService.findServicesProvider(id);

      return response.status(200).json({
        success: true,
        services: services.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
            address: service.provider.address,
            description: service.provider.description,
            email: service.provider.email,
            rating: service.provider.rating_average
          }
        }))
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getAppointments(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const service = new ProviderService();

      const appointments = await service.findAppointmentsProvider(id);

      return response.status(200).json({
        success: true,
        appointments: appointments.map(appointment => ({
            id: appointment?.id,
            scheduled_at: appointment?.scheduled_at,
            appointment_to: appointment?.appointment_to,
            time_done_at: appointment?.time_done_at,
            canceled_at: appointment?.canceled_at,
            provider: {
              id: appointment?.provider.id,
              name: appointment?.provider.name,
            },
            customer: {
              id: appointment?.customer.id,
              name: appointment?.customer.name,
            },
            service: {
              id: appointment?.service.id,
              name: appointment?.service.description,
              value: appointment?.service.value,
            }
        }
        )
        )
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async create(request: Request, response: Response) {
    try {
      const service = new ProviderService();

      const { name, email, password } = request.body;

      const provider = await service.execute({
        name,
        email,
        password
      });

      return response.status(200).json({
        success: true,
        provider: provider
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async googleSignIn(request: Request, response: Response){
    const {name, email} = request.body;
    const customerService =  new CustomerService();
    const providerService =  new ProviderService();
    const sessionService = new SessionService();
    const currentUser = { email, password: ''};
    
    if(! await customerService.checkEmail(email)){
      try{
         const customer = await customerService.execute({
          name,
          email,
          password: ''
        });
        currentUser.email = customer.email
        const {user, token} = await sessionService.execute(currentUser);
        return response.status(200).json({success:true,user, token}); 
      } catch (err){
        
        return response.status(400).json({
          success:false,
          error : err.message});
      }  

    }
    try{
      const {user, token} = await sessionService.execute(currentUser);
      return response.status(200).json({success:true,user, token}); 
    }catch(err){
      console.log(err);
      return response.status(400).json({
        success:false,
        error : err.message});
    }
    
    }
    
  }

export default new ProviderController();