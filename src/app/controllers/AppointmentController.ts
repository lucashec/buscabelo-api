import { Request, Response } from 'express';
import {parseISO, format} from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';

class AppointmentController{  

  async getAll(request: Request, response: Response){
    try{
      const service = new CreateAppointmentService();

      const appointments = await service.find()

      return response.status(200).json({
        message: "appointments found!",
        data: appointments
      });

    }catch(err){
      return response.status(400).json({error : err.message});
    }
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