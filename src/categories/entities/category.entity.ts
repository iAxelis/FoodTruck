import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from 'src/foods/entities/food.entity';
import { OneToMany } from 'typeorm'; 
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
        id!: number;
        @Column()
        nombre!: string;
        @Column()
        description!: string;
        @Column({ default: true })
        active!: boolean;
        @OneToMany(() => Food, (food) => food.category)
        foods!: Food[];
        
}
