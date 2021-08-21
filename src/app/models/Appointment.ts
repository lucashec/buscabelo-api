import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "./Customer";
import Provider from "./Provider";
import Service from "./Service";

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

  @ManyToOne(type => Provider, {eager: true})
  provider: Provider;

  @ManyToOne(type => Customer, {eager: true})
  customer: Customer;

  @ManyToOne(type => Service, {eager: true})
  service: Service;
}