import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TowerEntity } from '../../towers/entities/tower.entity';

@Entity('floors')
export class FloorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'uuid' })
  tower_id: string;

  @ManyToOne(() => TowerEntity, (tower) => tower.floor_list, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tower_id' })
  tower: TowerEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}