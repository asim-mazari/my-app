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
  country: string; // You can replace this with a foreign key reference if needed

  @Column()
  city: string; // You can replace this with a foreign key reference if needed

  @Column()
  additionalNotes: string;

  @Column()
  businessName: string;

  @ManyToOne(() => Users, user => user.contactDetails) // Many ContactDetails can belong to one Users
  @JoinColumn({ name: 'user_id' }) // Foreign key column name
  user: Users;
}
