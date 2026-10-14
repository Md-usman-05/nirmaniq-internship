import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProjectEntity } from '../../projects/entities/project.entity';
import { FloorEntity } from '../../floors/entities/floor.entity';

@Entity('towers')
export class TowerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  floors: number;

  @Column({ type: 'text' })
  status: string;

  @Column({ type: 'uuid' })
  project_id: string;

  @ManyToOne(() => ProjectEntity, (project) => project.towers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'project_id' })
  project: ProjectEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;

  @OneToMany(() => FloorEntity, (floor) => floor.tower)
  floor_list: FloorEntity[];
}
