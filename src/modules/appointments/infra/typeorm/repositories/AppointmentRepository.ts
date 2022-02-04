import {getRepository, Repository} from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import IAppointmentDTO from '@modules/appointments/dtos/IAppointmentDTO';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Service from '@modules/services/infra/typeorm/entities/Service';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
 
export default class AppointmentRepository implements IAppointmentRepository{
  private ormRepository : Repository<Appointment>
  private providerRepository : Repository<Provider>
  private customerRepository : Repository<Customer>
  private serviceRepository : Repository<Service>
  
  public constructor(){
    this.ormRepository = getRepository(Appointment);
    this.providerRepository = getRepository(Provider);
    this.customerRepository = getRepository(Customer);
    this.serviceRepository = getRepository(Service);
  }
  public async getAllAppointments(): Promise<Appointment[] | undefined> {
    const appointments = await this.ormRepository.find();
    return appointments;
  }
  public async findAppointmentById(id: number): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({id: id})
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {appointment_to: date}
    }); 
    
    return findAppointment;
  }
  public async create({provider, customer, 
    appointment_to, scheduled_at, service}: IAppointmentDTO): Promise<Appointment>{
      const appointment = await this.ormRepository.create({
        provider,
        customer,
        appointment_to,
        scheduled_at,
        service
      });
      const providerId = await this.providerRepository.findOne({
        where: {id: provider}
      });
      const customerId = await this.customerRepository.findOne({
        where: {id: customer}
      });
      const serviceId = await this.serviceRepository.findOne({
        where:{id: service}
      });
      appointment.provider = providerId!;
      appointment.customer = customerId!;
      appointment.service = serviceId!;

      this.ormRepository.save(appointment);

      return appointment;
  }
  public async update(id: number, updateAppointment: any ): Promise<Appointment | undefined>{
    await this.ormRepository.update(id, updateAppointment);
    const appointment = await this.ormRepository.findOne({id : id});
    return appointment;
  }
}