import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInputDto } from './dto/createRestaurantInput.dto';
import { UpdateRestaurantDto } from './dto/updateRestaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }
  createRestaurantService(
    createRestaurantInput: CreateRestaurantInputDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurants.create(createRestaurantInput);
    return this.restaurants.save(newRestaurant);
  }
  updateRestaurantService({ id, data }: UpdateRestaurantDto) {
    return this.restaurants.update(id, { ...data }); // 첫번째 인자는 where이다.
  }
}
