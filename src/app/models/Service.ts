import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Provider from "./Provider";
import Image from "./Image";

export enum Type{
  Haircut = "Corte",
  Haircare =  "Tratamento",
  Barb =  "Barba",
  Default = ""
}
@Entity()
export default class Service{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "float" })
  value: number;

  @Column({
    type:'enum',
    enum:Type,
    default: Type.Default
  })
  type: Type;
  
  @ManyToOne(type => Provider, provider => provider.services, {eager: true})
  provider: Provider

  @OneToMany(() => Image, image => image.service)
  images: Image [];
}

