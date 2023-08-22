import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity()
export class CompanyInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Lable: string;
  
  @Column()
  FullName: string;
  
  @Column()
  Mobile: string;
  @Column()
  Email: string;

  @Column()
  Address: string;

  @Column()
  City: string;

  @Column()
  Country: string;
}
