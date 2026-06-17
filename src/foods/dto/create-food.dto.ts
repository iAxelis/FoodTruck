import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';
import { OneToMany } from 'typeorm';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  price!: number;

  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  category!: Category

 
}