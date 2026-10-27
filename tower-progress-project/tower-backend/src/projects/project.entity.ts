import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Tower } from '../towers/tower.entity';
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
  @ManyToOne(() => User)
  manager: User; 
  @OneToMany(() => Tower, (tower) => tower.project)
  towers: Tower[]; 
}