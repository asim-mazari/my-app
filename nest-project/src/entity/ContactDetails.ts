import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users'; // Assuming the path to your Users entity

@Entity()
export class ContactDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  mobile: string;

  @Column()
  country: string; 

  @Column()
  city: string; 

  @Column()
  additionalNotes: string;

  @Column()
  businessName: string;

  @ManyToOne(() => Users, user => user.contactDetails) 
  @JoinColumn({ name: 'user_id' }) 
  user: Users;
}
