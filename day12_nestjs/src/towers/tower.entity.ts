import { FloorDto } from './dto/floor.dto';

export interface Tower {
  id: string;
  projectId: string;
  name: string;
  floors: number;
  status: 'Planned' | 'Under Construction' | 'Completed';
  floorList: FloorDto[];
}