import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';


@Injectable()
export class FoodsService {
constructor(
  @InjectRepository(Food)
  private foodRepository: Repository<Food>
  
){

}

 async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);
    return await this.foodRepository.save(food);
  }
  findAll() {
     return  this.foodRepository.find();
  }

async findOne(id: number) {
  const food = await this.foodRepository.findOneBy({ id });

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
  const updateFOOD = this.foodRepository.merge (food, updateFoodDto);
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
