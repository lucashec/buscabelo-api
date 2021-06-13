import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Customer from "./Customer";
import Provider from "./Provider";

@Entity()
export default class Appointment{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({ type: "timestamp" })
  scheduled_at: string;

  @Column({ type: "timestamp" })
  appointment_to: string;

  @Column({ type: "timestamp" })
  time_done_at: string;

  @Column({ type: "timestamp" })
  canceled_at: string;

  @OneToOne(() => Provider)
  @JoinColumn()
  provider: Provider;

  @OneToOne(() => Customer)
  @JoinColumn()
  customer: Customer;
}