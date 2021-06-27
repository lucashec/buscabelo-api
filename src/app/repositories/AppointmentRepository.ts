import Appointment from '../models/Appointment';
import {Entity, EntityRepository, Repository} from 'typeorm';

@EntityRepository(Appointment)
export default class AppointmentRepository extends Repository<Appointment>{
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {appointment_to: date}
    }); 
    
    return findAppointment || null;
  }
  
}