import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  // This creates a Foreign Key in the database linking this project to a specific user
  @ManyToOne(() => User)
  manager: User; 
}