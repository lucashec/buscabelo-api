import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
<<<<<<< HEAD

export default class UpdateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentRepository){}
=======
import { injectable, inject } from 'tsyringe';

@injectable()
export default class UpdateAppointmentService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointmentRepository
    ){}
>>>>>>> master
  public async execute(id: number, updateAppointment : any){
    const appointment = this.appointmentsRepository.update(id, updateAppointment);

    const currenteAppointment = this.appointmentsRepository.findAppointmentById(id);

    return currenteAppointment;
  }
}