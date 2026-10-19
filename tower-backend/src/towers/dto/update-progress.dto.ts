import { IsInt, IsString, IsIn } from 'class-validator';

export class UpdateProgressDto {
  @IsInt()
  floorNumber: number;

  @IsString()
  @IsIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  status: string;
}