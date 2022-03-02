import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Provider from "./Provider";

@Entity()
export default class Rating{
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  rating_number: number;

  @ManyToOne((type) => Provider, (provider) => provider.ratings, { eager: true })
  provider: Provider
}

