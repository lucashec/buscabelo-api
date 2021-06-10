import {Entity, Column, PrimaryGeneratedColumn, TableInheritance} from "typeorm";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class Info {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

}