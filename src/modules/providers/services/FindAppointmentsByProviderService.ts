import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
<<<<<<< HEAD
import IProviderRepository from '../repositories/IProviderRepository';

export default class FindAppointmentsByProviderService{
  constructor(private providerRepository : IProviderRepository){}
=======
import { injectable, inject } from 'tsyringe';
import IProviderRepository from '../repositories/IProviderRepository';

@injectable()
export default class FindAppointmentsByProviderService{
  constructor(
    @inject("ProviderRepository")
    private providerRepository: IProviderRepository
    ){}
>>>>>>> master

  public async execute(id: string): Promise<Appointment[]> {
    const provider = await this.providerRepository.findById(id);
    const appointments = provider?.appointments;

    if(!appointments) {
      throw new Error ('no services found!');
    }

    return appointments;
  }


}