import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import Customer from "./Customer";
import Provider from "./Provider";
import Service from "./Service";
import Rating from './Rating';

@Entity()
export default class Appointment{
  @PrimaryGeneratedColumn()
  id:number;

  @Column('timestamp')
  scheduled_at: Date;

  @Column('timestamp')
  appointment_to: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  time_done_at: Date;

  @Column({
    type:'timestamp',
    nullable:true,
  })
  canceled_at: Date;

  @ManyToOne(() => Provider, (provider) => provider.appointments)
  provider: Provider;

  @ManyToOne(() => Customer, (customer) => customer.appointments)
  customer: Customer;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @ManyToOne(() => Rating, (rating) => rating.appointments)
  rating: Rating;
}
