import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsString, Max, Min, ValidateNested } from 'class-validator';
import { FloorDto } from './floor.dto';

export class CreateTowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  @Max(200)
  floors: number;

  @IsIn(['Planned', 'Under Construction', 'Completed'])
  status: 'Planned' | 'Under Construction' | 'Completed';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FloorDto)
  floorList: FloorDto[];
}