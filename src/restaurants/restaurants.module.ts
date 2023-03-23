import { Module } from '@nestjs/common';
import {
  CategoryResolver,
  DishResolver,
  RestaurantsResolver,
} from './restaurants.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import { CategoryRepository } from './repositories/category.repository';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category])],
  providers: [
    RestaurantsResolver,
    RestaurantService,
    CategoryRepository,
    CategoryResolver,
    DishResolver,
  ],
})
export class RestaurantsModule {}
