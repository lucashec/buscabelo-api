import { Request, Response } from 'express';
<<<<<<< HEAD
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';
=======
>>>>>>> master
import CreateProviderService from '@modules/providers/services/CreateProviderService';
import FilterByNameService from '@modules/providers/services/FilterByNameService';
import FindAppointmentsByProviderService from '@modules/providers/services/FindAppointmentsByProviderService';
import FindProviderByIdService from '@modules/providers/services/FindProviderByIdService';
import FindServicesByProviderService from '@modules/providers/services/FindServicesByProviderService';
import GetAllProvidersService from '@modules/providers/services/GetAllProvidersService';
<<<<<<< HEAD

export class ProviderController {
  private providerRepository : ProviderRepository;
  private static INSTANCE : ProviderController;
  
  constructor(){
    this.providerRepository = new ProviderRepository();
  }  
   
=======
import { container } from 'tsyringe';

export class ProviderController {
  private static INSTANCE : ProviderController;
  
>>>>>>> master
   static getInstance(): ProviderController{
    if (!ProviderController.INSTANCE){
      ProviderController.INSTANCE = new ProviderController();
    }
    return ProviderController.INSTANCE;
  }

  async getAll(request: Request, response: Response) {
    try {
<<<<<<< HEAD
      const providerService = new GetAllProvidersService(this.providerRepository);
=======
      const providerService = container.resolve(GetAllProvidersService);
>>>>>>> master

      const providers = await providerService.execute()

      return response.status(200).json({
        success: true,
        providers: providers?.map(provider => ({
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

<<<<<<< HEAD
      const providerService = new FilterByNameService(this.providerRepository);
=======
      const providerService = container.resolve(FilterByNameService);
>>>>>>> master

      const providers = await providerService.execute(name);

      return response.status(200).json({
        success: true,
        providers: providers?.map(provider => ({
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
<<<<<<< HEAD
      const providerService = new FindProviderByIdService(this.providerRepository);
=======
      const providerService = container.resolve(FindProviderByIdService);
>>>>>>> master

      const provider = await providerService.execute(id);

      return response.status(200).json({
        success: true,
        provider: {
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
<<<<<<< HEAD
      const providerService = new FindServicesByProviderService(this.providerRepository);
=======
      const providerService = container.resolve(FindServicesByProviderService);
>>>>>>> master

      const services = await providerService.execute(id);

      return response.status(200).json({
        success: true,
        services: services.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
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
<<<<<<< HEAD
      const service = new FindAppointmentsByProviderService(this.providerRepository);
=======
      const service = container.resolve(FindAppointmentsByProviderService);
>>>>>>> master

      const appointments = await service.execute(id);

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
        }))
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
<<<<<<< HEAD
      const service = new CreateProviderService(this.providerRepository);
=======
      const service = container.resolve(CreateProviderService);
>>>>>>> master

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
}

 