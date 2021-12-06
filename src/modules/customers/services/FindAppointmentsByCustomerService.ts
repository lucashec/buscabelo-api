import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICustomerRepository from '../repositories/ICustomerRepository';

export default class FindAppointmentsByCustomerService {
  constructor(private CustomerRepository: ICustomerRepository){}

  public async execute(id: string): Promise<Appointment[]> {
    const appointments = await this.CustomerRepository.findAppointmentsByCustomer(id);

    if(!appointments) {
      throw new Error ('no services found!');
    }
    return appointments;
  }
}
