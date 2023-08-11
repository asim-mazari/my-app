import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ContactDetails } from './ContactDetails'; // Update the path accordingly

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  FirstName: string;
  
  @Column()
  Lastname: string;
  
  @Column()
  Email: string;

  @Column()
  password: string;

  @Column()
  dob: Date;

  @Column()
  Address: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true }) 
  last_login: Date;

  @OneToMany(() => ContactDetails, contactDetails => contactDetails.user) // One User can have Many ContactDetails
  contactDetails: ContactDetails[]; // Define the property for the relationship
}
