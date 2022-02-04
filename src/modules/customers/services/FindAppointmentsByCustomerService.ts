import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICustomerRepository from '../repositories/ICustomerRepository';

export default class FindAppointmentsByCustomerService {
  constructor(
    private CustomerRepository: ICustomerRepository,
    private AppointmentRepository: IAppointmentRepository
    ){}

  public async execute(id: string): Promise<Appointment[]> {
    const appointments = await this.CustomerRepository.findAppointmentsByCustomer(id);

    if(!appointments) {
      throw new Error ('no appointments found!');
    }
    return appointments;
  }
}
