import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Appointment from "./Appointment";
import Customer from "./Customer";

@Entity()
export default class Rating{
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  rating_number: number;

  @ManyToMany(type => Customer, {eager: true})
  customer: Customer;

  @ManyToOne(() => Appointment, appointment => appointment.rating)
  appointment: Appointment;
}
