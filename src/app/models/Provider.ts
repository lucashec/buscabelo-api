import { ChildEntity, Column, OneToMany } from 'typeorm';
import Appointment from './Appointment';
import Service from './Service';
import User from './User';

@ChildEntity()
export default class Provider extends User {
  @Column()
  description: string;

  @Column()
  address: string;

  @Column({ type: "float" })
  rating_average: number;

  @OneToMany(() => Service, service => service.provider)
  services: Service[];

  @OneToMany(() => Appointment, appointment => appointment.provider)
  appointments: Appointment[];
}