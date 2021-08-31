import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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
}
