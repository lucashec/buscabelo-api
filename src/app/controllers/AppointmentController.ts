import { Request, Response } from 'express';
import {parseISO, format, addHours, isBefore} from 'date-fns';

import CreateAppointmentService from '../services/CreateAppointmentService';


class AppointmentController{  
  async getAll(request: Request, response: Response){
    try{
      const service = new CreateAppointmentService();

      const appointments = await service.find()
      const filteredAppointments = [];
      const dateNow =  parseISO(format(new Date, 'YYYY-mm-DD HH'));

      for(let appointment of appointments){
        if (isBefore(appointment.appointment_to, dateNow)){
          filteredAppointments.push(appointment);
        }
      }

      return response.status(200).json({
        success: true,
        appointments: filteredAppointments
      });

    }catch(err){
      return response.status(400).json({
        success: false,
        message : err.message
      });
    }
  }
  
  async getById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const appoinmentService = new CreateAppointmentService();
      
      const appointment = await appoinmentService.findOne(Number(id));
      
      return response.status(200).json({
        success: true,
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
        }
      });

    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
  }

  async update(request: Request, response: Response){
    const path = request.path
    try {
      const {canceled_at,time_done_at,} = request.body;
      const { id } = request.params;
      const timeNowParsed = parseISO(format(new Date, 'yyyy-MM-dd HH:mm:ss'));
      const appointmentService = new CreateAppointmentService();
      //const currentAppointmet = await appointmentService.findOne(Number(id));

      if (path.includes('cancel')){
        const appointment = await appointmentService.update(Number(id), {
          canceled_at,
        })
         return response.status(200).json({
          success: true,
          appointment: appointment
        });
      } else {
        // if (currentAppointmet?.canceled_at === null){
        //   throw new Error ('Appointment is already canceled');
        // }
        // if (currentAppointmet?.appointment_to < addHours(timeNowParsed, 1)){
        //   throw new Error (`It's too earlier to cancel`);
        // }

        const appointment = appointmentService.update(Number(id), {
          time_done_at,        
        })
         return response.status(200).json({
          success: true,
          appointment: appointment
        });
      }

      
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
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
      if(provider === customer){
        throw new Error ('Users must be distinct');
      }
    
      const createAppointment = new CreateAppointmentService();

      const appointment = await createAppointment.execute({
        provider,
        customer,
        appointment_to: parsedDate,
        service,
        scheduled_at: timeNowParsed,
      })
      return response.json({
        success: true,
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
        }
      });
    } catch(err){
      return response.status(400).json({
        success: false,
        message: err.message
      });
    }
    
  } 
  
}

export default new AppointmentController();