import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInputDto } from './dto/createRestaurantInput.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurant: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.restaurant.find();
  }
  createRestaurantService(
    createRestaurantInput: CreateRestaurantInputDto,
  ): Promise<Restaurant> {
    const newRestaurant = this.restaurant.create(createRestaurantInput);
    return this.restaurant.save(newRestaurant);
  }
}
