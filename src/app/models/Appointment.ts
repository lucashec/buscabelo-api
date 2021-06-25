import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "./Customer";
import Provider from "./Provider";
import Service from "./Service";

@Entity()
export default class Appointment{
  @PrimaryGeneratedColumn()
  id:number;

  @Column('time with time zone')
  scheduled_at: Date;

  @Column('time with time zone')
  appointment_to: Date;

  @Column('time with time zone')
  time_done_at: Date;

  @Column('time with time zone')
  canceled_at: Date;

  @OneToOne(() => Provider)
  @JoinColumn()
  provider: Provider;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;

  @OneToOne(() => Service)
  @JoinColumn()
  service: Service;
}