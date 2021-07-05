import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToOne(type => Provider, {eager: true})
  @JoinColumn()
  provider: Provider;

  @OneToOne(type => Customer, {eager: true})
  @JoinColumn()
  customer: Customer;

  @OneToOne(type => Service, {eager: true})
  @JoinColumn()
  service: Service;
}