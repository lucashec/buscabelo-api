import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import Service from "@modules/services/infra/typeorm/entities/Service";
import IProviderDTO from "../dtos/IProviderDTO";
import Provider from "../infra/typeorm/entities/Provider";

export default interface IProviderRepository{
  create(data: IProviderDTO):Promise<Provider>;
  find():Promise<Provider[] | undefined>;
  findById(id: string): Promise<Provider | undefined>;
  findByEmail(email: string): Promise<Provider | undefined>;
  filterByName(name: any): Promise<Provider[] | undefined>;
  findAppointmentsByProvider(id: string):Promise<Appointment[] | undefined>;
  findServicesByProvider(id: string): Promise<Service [] | undefined>
  save(provider: Provider): Promise<Provider>;
  findTop5Providers(): Promise<Provider[]>;
}