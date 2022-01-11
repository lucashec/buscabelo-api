import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
<<<<<<< HEAD

export default class GetAllAppointmentsService {

  constructor(private appointmentsRepository: IAppointmentRepository){}
=======
import { injectable, inject } from 'tsyringe';

@injectable()
export default class GetAllAppointmentsService {
  constructor(
    @inject("AppointmentRepository")
    private appointmentsRepository: IAppointmentRepository
    ){}
>>>>>>> master

  public async execute(): Promise<Appointment[] | undefined>{

    const appointments = await this.appointmentsRepository.getAllAppointments()

    return appointments;
  }
  }