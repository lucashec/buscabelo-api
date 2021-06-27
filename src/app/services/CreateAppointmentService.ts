import Customer from 'app/models/Customer';
import Provider from 'app/models/Provider';
import Service from 'app/models/Service';
import { startOfHour, format } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider: Provider;
  customer: Customer;
  appointment_to: Date;
  scheduled_at: Date;
  service: Service;
}

export default class CreateAppointmentService {

  public async find(): Promise<Appointment[]>{
    const repository = getRepository(Appointment);

    const appointments = await repository.find()

    return appointments;
  }

  public async execute({
    provider,
    customer,
    appointment_to,
    scheduled_at,
    service
  }: Request): Promise<Appointment> {

    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(appointment_to);

    const scheduledDate = startOfHour(scheduled_at);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmentDate,
    );


    if (findAppointmentInSameDate) {
      throw Error("this time it's already booked");
    }

    const appointment = appointmentRepository.create({
      provider,
      customer,
      service,
      appointment_to: appointmentDate,
      scheduled_at: scheduledDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}