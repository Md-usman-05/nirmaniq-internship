import { IsString, IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateTowerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  // NEW: Require the PM to specify how many floors this tower has
  @IsInt()
  @Min(1)
  totalFloors: number;
}