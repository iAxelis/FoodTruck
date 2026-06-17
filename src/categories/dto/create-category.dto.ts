import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';


export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  
}