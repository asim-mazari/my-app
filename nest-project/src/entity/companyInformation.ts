import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity()
export class CompanyInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;
  
  @Column()
  fullName: string;
  
  @Column()
  mobile: string;
  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;
}
