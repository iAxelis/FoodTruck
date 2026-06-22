import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';


@Injectable()
export class FoodsService {
constructor(
  @InjectRepository(Food)
  private foodRepository: Repository<Food>,
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>
){
}

 async create(createFoodDto: CreateFoodDto) {
    const category = await this.categoryRepository.findOneBy({ id: createFoodDto.category });
    if (!category) {
      throw new NotFoundException(`categoria con el id ${createFoodDto.category} no encontrada`);
    }
    
    const food = this.foodRepository.create({ ...createFoodDto, category });
    return await this.foodRepository.save(food);
  }
  findAll() {
     return  this.foodRepository.find({ relations: { category: true } });
  }

async findOne(id: number) {
  const food = await this.foodRepository.findOne(
    { 
      where: { id },
      relations: { category: true }
     });

  if (!food) {
    throw new NotFoundException(`comida con el id ${id} no encontrada`);
  }

  return food;
}
   async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) {
    throw new NotFoundException(`comida con el id ${id} no encontrada`);
  }
  const category = await this.categoryRepository.findOneBy({ id: updateFoodDto.category });
    if (!category) {
      throw new NotFoundException(`categoria con el id ${updateFoodDto.category} no encontrada`);
    }
  
  const updateFOOD = this.foodRepository.merge (food, {...updateFoodDto, category });
  return  this.foodRepository.save(updateFOOD);




  }

 async remove(id: number) {
    const food =  await this.foodRepository.findOneBy({ id });
    if (!food){
      throw new NotFoundException(`comida con el id ${id} no encontrada`);

    }
     await this.foodRepository.delete(id);
      return { message: `comida con el id ${id} eliminada` };
    
    
    
  }
}
