import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';
@Entity()
export class Tower {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  totalFloors: number;
  @Column({ type: 'jsonb', default: [] })
  floors: { floorNumber: number; status: string }[];
  @Column({ default: 0 })
  progressPercentage: number;
  @ManyToOne(() => Project, (project) => project.towers, { onDelete: 'CASCADE' })
  project: Project; 
}