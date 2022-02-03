import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

export default class GetAllAppointmentsService {
  constructor(
    private appointmentsRepository: IAppointmentRepository
    ){}

  public async execute(): Promise<Appointment[] | undefined>{

    const appointments = await this.appointmentsRepository.getAllAppointments()

    return appointments;
  }
  }