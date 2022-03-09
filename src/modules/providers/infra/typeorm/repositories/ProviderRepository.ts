import {getRepository, Repository, ILike} from 'typeorm';
import IProviderRepository from '@modules/providers/repositories/IProviderRepository'
import Provider from '../entities/Provider';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Service from '@modules/services/infra/typeorm/entities/Service';
import IProviderDTO from '@modules/providers/dtos/IProviderDTO';

export default class ProviderRepository implements IProviderRepository{
  private ormRepository : Repository<Provider>
  private appointmentRepository : Repository<Appointment>
  private serviceRepository : Repository<Service>
  
  public constructor(){
    this.ormRepository = getRepository(Provider);
    this.appointmentRepository = getRepository(Appointment);
    this.serviceRepository =  getRepository(Service);
  }
  public async create(providerDTO: IProviderDTO): Promise<Provider>{
      const provider = await this.ormRepository.create(providerDTO);
      
      this.ormRepository.save(providerDTO);

      return provider;
  }
  public async findById(id: string): Promise<Provider | undefined>{
    const provider = await this.ormRepository.findOne(id);
    return provider;
  }
  public async find(): Promise<Provider[] | undefined>{
    const providers = await this.ormRepository.find();
    
    return providers;
  }
  public async findByEmail(email: string): Promise<Provider | undefined>{
    const provider = await this.ormRepository.findOne({
      where: {email}
    })
    return provider;
  }
  public async filterByName(name: string): Promise<Provider[] | undefined>{
    const providers = await this.ormRepository.find({
      name: ILike(`%${name}%`)
    });
    return providers;
  }
  public async findAppointmentsByProvider(id: string): Promise<Appointment[] | undefined>{
    const appointments = await this.appointmentRepository.find({
      provider: {id: id}
    });
    return appointments; 
  }
  public async findServicesByProvider(id: string): Promise<Service[] | undefined>{
    const services = await this.serviceRepository.find({
      provider: {id: id}
    });
    return services; 
  }
  public async save(provider: Provider): Promise<Provider>{
    const updatedProvider = await this.ormRepository.save(provider);
    return updatedProvider;
  }
}