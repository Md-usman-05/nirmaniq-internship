import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

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
}