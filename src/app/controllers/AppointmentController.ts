import { Request, Response } from 'express';
import {parseISO, format} from 'date-fns';
import {getCustomRepository} from 'typeorm'
import CreateAppointmentService from '../services/CreateAppointmentService';
import AppointmentRepository from '../repositories/AppointmentRepository';

class AppointmentController{  

  async getAll(request:Request, response: Response){
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments =  appointmentRepository.find();

    return response.json(appointments);
  }
  async create(request: Request, response: Response){
    try{
      const {
        provider, 
        customer, 
        appointment_to, 
        service, 
      } = request.body;
      
      const timeNow = format(new Date, 'yyyy-MM-dd');
      const timeNowParsed = parseISO(timeNow);
      const parsedDate = parseISO(appointment_to); 
    
      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        provider,
        customer,
        appointment_to: parsedDate,
        service,
        scheduled_at: timeNowParsed,
      })
      return response.json(appointment);
    } catch(err){
      return response.status(400).json({error: err.message});
    }
    
  } 
  
}

export default new AppointmentController();