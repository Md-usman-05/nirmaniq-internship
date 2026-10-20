export enum UserRole {
  PM = 'PM',
  SE = 'SE',
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users') 
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true })
  email: string;
  @Column()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SE,
  })
  role: UserRole;
}