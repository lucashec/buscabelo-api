import { Request, Response } from 'express';
import {parseISO, format, addMinutes} from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';
import isBefore from 'date-fns/isBefore';

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
  
  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const appoinmentService = new CreateAppointmentService();
      
      const appointment = await appoinmentService.findOne(Number(id));
      
      return response.status(200).json({
        message: "Appointments found!",
        appointment:{
          id:appointment?.id,
          scheduled_at: appointment?.scheduled_at,
          appointment_to: appointment?.appointment_to,
          time_done_at: appointment?.time_done_at,
          canceled_at: appointment?.canceled_at,
          provider:{
            id: appointment?.provider.id,
            name: appointment?.provider.name,
          },
          customer:{
            id: appointment?.customer.id,
            name: appointment?.customer.name,
          },
          service:{
            id: appointment?.service.id,
            name: appointment?.service.description,
            value: appointment?.service.value,
          }
        },
      });

    } catch (err) {
      return response.status(400).json({ error: err.message })
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
      
      const timeNowParsed = parseISO(format(new Date, 'yyyy-MM-dd'));
      const parsedDate = parseISO(appointment_to); 

      if(isBefore(parsedDate, timeNowParsed)){
        throw new Error ('The data must be later than this');
      }
    
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