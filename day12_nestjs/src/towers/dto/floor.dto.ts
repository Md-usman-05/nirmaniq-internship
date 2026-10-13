import { IsInt, IsString, Max, Min, MinLength } from 'class-validator';

export class FloorDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @Min(1)
  @Max(200)
  number: number;
}