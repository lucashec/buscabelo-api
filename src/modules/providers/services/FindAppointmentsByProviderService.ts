import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IProviderRepository from '../repositories/IProviderRepository';

export default class FindAppointmentsByProviderService{
  constructor(
    private providerRepository: IProviderRepository,
    private appointmentRepository: IAppointmentRepository
    ){}

  public async execute(id: string): Promise<Appointment[]> {
    const appointments = await this.providerRepository.findAppointmentsByProvider(id);
   
    if(!appointments) {
      throw new Error ('no services found!');
    }

    return appointments;
  }


}