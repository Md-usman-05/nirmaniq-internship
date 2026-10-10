import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['Active', 'Pending', 'Completed', 'On Hold'])
  status: 'Active' | 'Pending' | 'Completed' | 'On Hold';

  @IsInt()
  @Min(0)
  @Max(100)
  progress: number;

  @IsIn(['Low', 'Medium', 'High'])
  risk: 'Low' | 'Medium' | 'High';
}
