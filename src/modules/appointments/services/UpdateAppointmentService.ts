import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

export default class UpdateAppointmentService {

  constructor(private appointmentsRepository: IAppointmentRepository){}
  public async execute(id: number, updateAppointment : any){
    const appointment = this.appointmentsRepository.update(id, updateAppointment);

    const currenteAppointment = this.appointmentsRepository.findAppointmentById(id);

    return currenteAppointment;
  }
}