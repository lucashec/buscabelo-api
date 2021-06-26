import { Request, Response, } from 'express';
import CreateServiceHelper from '../services/CreateServiceHelper';

class ServiceController {
 
  async getAll(request: Request, response: Response) {
    try {
      const customerService = new CreateServiceHelper();

      const services = await customerService.find()
      return response.status(200).json({
        message: "Services found!",
        data: services
      });

    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const customerService = new CreateServiceHelper();

      const service = await customerService.findOne(Number(id))

      return response.status(200).json({
        message: "Service found!",
        data: service
      });

    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }

  async filterName(request: Request, response: Response) {
    try {
      let name = request.query["name"];
      
      const customerService = new CreateServiceHelper();

      const service = await customerService.filterName(name);

      return response.status(200).json({
        message: "Services found!",
        data: service
      });

    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }

  async create(request: Request, response: Response) {
    try {
      const { name, description, value, provider } = request.body;

      const createService = new CreateServiceHelper();

      const service = await createService.execute({
        name,
        description,
        value,
        provider,
      });

      return response.status(200).json({
        message: "service Created!",
        data: service
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { name, description, value, provider } = request.body;

      const { id } = request.params;

      const createService = new CreateServiceHelper();

      const service = await createService.update(Number(id), {
        name,
        description,
        value,
        provider,
      });

      return response.status(200).json({
        message: "Updated service!",
        data: service
      });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  async remove(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const customerService = new CreateServiceHelper();

      const service = await customerService.delete(Number(id))

      return response.status(200).json({
        message: "Service found!",
        data: service
      });

    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }
}

export default new ServiceController();
