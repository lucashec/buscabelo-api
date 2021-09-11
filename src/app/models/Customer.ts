import { ChildEntity, OneToMany } from 'typeorm';
import Appointment from './Appointment';
import User from './User';

@ChildEntity()
export default class Customer extends User {
  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments: Appointment[];
}
