import { Request, Response, } from 'express';
import DeleteServiceManager from '@modules/services/managers/DeleteServiceManager';
import FilterByNameManager from '@modules/services/managers/FilterByNameManager';
import FindByProviderManager from '@modules/services/managers/FindByProviderManager';
import FindServiceByIdManager from '@modules/services/managers/FindServiceByIdManager';
import UpdateServiceManager from '@modules/services/managers/UpdateServiceManager';
import CreateServiceManager from '@modules/services/managers/CreateServiceManager';
import { container } from 'tsyringe';
import ServiceRepository from '../../typeorm/repositories/ServiceRepository';
import ProviderRepository from '@modules/providers/infra/typeorm/repositories/ProviderRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';

export class ServiceController {
  private static INSTANCE : ServiceController;

  static getInstance(): ServiceController{
    if (!ServiceController.INSTANCE){
      ServiceController.INSTANCE = new ServiceController();
    }
    return ServiceController.INSTANCE;
  }

  async getAll(request: Request, response: Response) {
    try {
      const serviceManager = container.resolve(FindByProviderManager);

      const services = await serviceManager.execute(request.user.id)
      return response.status(200).json({
        success: true,
        services: services?.map(service => ({
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
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

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const serviceManager = container.resolve(FindServiceByIdManager);

      const service = await serviceManager.execute(Number(id));

      return response.status(200).json({
        success: true,
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
          }
        }
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

      const manager = container.resolve(FilterByNameManager);
      const services = await manager.execute(name);

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
    const serviceRepository = new ServiceRepository();
    const providerRepository = new CustomerRepository();

    try {
      const { name, description, value, provider } = request.body;

      const createService = new CreateServiceManager(serviceRepository, providerRepository);

      const service = await createService.execute({
        name,
        description,
        value,
        provider,
      });

      return response.status(200).json({
        success: true,
        service: {
          id: service.id,
          name: service.name,
          description: service.description,
          value: service.value,
          type: service.type,
          provider: {
            id: service.provider.id,
            name: service.provider.name,
          }
        }
      });

    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });;
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { name, description, value, provider } = request.body;
      const { id } = request.params;
      const manager = container.resolve(UpdateServiceManager);
      const service = await manager.execute(Number(id), {
        name,
        description,
        value,
        provider,
      });

      return response.status(200).json({
        success: true,
        service: service
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const manager = container.resolve(DeleteServiceManager);
      const service = await manager.execute(Number(id))

      return response.status(200).json({
        success: true,
        service: service
      });

    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}


