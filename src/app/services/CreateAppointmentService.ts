import Customer from '../models/Customer';
import Provider from '../models/Provider';
import Service from '../models/Service';
import { startOfHour } from 'date-fns';
import { getCustomRepository, getRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import Rating from '../models/Rating';

interface Request {
  provider: Provider;
  customer: Customer;
  appointment_to: Date;
  scheduled_at: Date;
  service: Service;
}

interface RatingRequest {
  customer: Customer;
  appointment?: Appointment;
  description?: string;
  rating_number : number;
}

export default class CreateAppointmentService {

  public async find(): Promise<Appointment[]>{
    const repository = getRepository(Appointment);

    const appointments = await repository.find()

    return appointments;
  }
  public async findOne(id : number): Promise<Appointment | undefined>{
    const repository = getRepository(Appointment);
    const appointment = await repository.findOne(id);
    return appointment;
  }
  public async update(id: number, updateAppointment : any){
    const appointmentRepository = getRepository(Appointment);

    const appointment = appointmentRepository.update(id, updateAppointment);

    const currenteAppointment = appointmentRepository.findOne({id: id});

    return currenteAppointment;
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
  public async executeRating(newRating: RatingRequest) : Promise<Rating> {
    const repository = getRepository(Rating);

    const rating = repository.create(newRating);

    await repository.save(rating);

    return rating;
  }
}