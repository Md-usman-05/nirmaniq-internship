import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class Tower {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // NEW: Total number of floors in the building
  @Column()
  totalFloors: number;

  // NEW: A JSON array tracking the exact status of each floor
  @Column({ type: 'jsonb', default: [] })
  floors: { floorNumber: number; status: string }[];

  // We keep this to easily display the overall progress bar on the dashboard
  @Column({ default: 0 })
  progressPercentage: number;

  @ManyToOne(() => Project, (project) => project.towers, { onDelete: 'CASCADE' })
  project: Project; 
}