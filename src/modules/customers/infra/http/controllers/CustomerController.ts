import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { Request, Response } from 'express';
import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import GetAllCustomerService from '@modules/customers/services/GetAllCustomersService';
import FindAppointmentsByCustomerService from '@modules/customers/services/FindAppointmentsByCustomerService';
import { container } from "tsyringe";
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

export class CustomerController{
  private static INSTANCE : CustomerController;
   
   static getInstance(): CustomerController{
    if (!CustomerController.INSTANCE){
      CustomerController.INSTANCE = new CustomerController();
    }
    return CustomerController.INSTANCE;
  }

  async getAll(request: Request, response: Response) {
    try {
      const customerService = container.resolve(GetAllCustomerService);

      const customers = await customerService.execute()

      return response.status(200).json({
        success: true,
        customers: customers?.map(customer => ({
          id: customer?.id,
          type: 'customer',
          name: customer?.name,
          email: customer?.email,
          avatar: customer?.avatar
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
      const customerService = container.resolve(CreateCustomerService);

      const { name, email, password } = request.body;

      const customer = await customerService.execute({
        name,
        email,
        password
      });

      return response.status(200).json({
        success: true,
        customer: {
          id: customer?.id,
          type: 'customer',
          name: customer?.name,
          email: customer?.email,
          avatar: customer?.avatar
        }
      });
    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }

  async getAppointments(request: Request, response: Response) {
    const customerRepository = new CustomerRepository();
    const appointmentRepository = new AppointmentRepository();
    try {
      const { id } = request.params;
      const customerService = new FindAppointmentsByCustomerService(customerRepository, appointmentRepository);
      const appointments = await customerService.execute(id);

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
        ))
      });

    } catch (err) {
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
  }
}

