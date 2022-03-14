import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import Image from './Image';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';


@Entity()
export default class Service {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'float' })
  value: number;

  @Column({default: ''})
  type: string;

  @ManyToOne((type) => Provider, (provider) => provider.services, { eager: true })
  provider: Provider

  @OneToMany(() => Image, (image) => image.service, {eager: true})
  images: Image [];

  @OneToMany(() => Appointment, (appointment) => appointment.provider)
  appointments: Appointment[];
}
