import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dto/createRestaurant.dto';
import { User } from '../uesrs/entities/user.entity';
import { Category } from './entities/category.entity';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dto/editRestaurant.dto';
import { CategoryRepository } from './repositories/category.repository';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(CategoryRepository)
    private readonly categories: CategoryRepository,
  ) {}

  async createRestaurantService(
    owner: User,
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    try {
      // create 는 restuarant 의 instance를 생성하지만 DB에는 저장하지 않는다.
      const newRestaurant = await this.restaurants.create(
        createRestaurantInput,
      );
      newRestaurant.owner = owner;

      const category = await this.categories.getOrCreate(
        createRestaurantInput.categoryName,
      );
      newRestaurant.category = category;
      // save 는 DB에 저장한다.
      await this.restaurants.save(newRestaurant);
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: '레스토랑을 생성할 수 없습니다.',
      };
    }
  }
  async editRestaurantService(
    owner: User,
    editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOneOrFail({
        where: { id: editRestaurantInput.restaurantId },
      });
      console.log('레스토랑', restaurant);
      if (!restaurant) {
        return {
          ok: false,
          error: '레스토랑을 찾을 수 없습니다.',
        };
      }
      if (owner.id !== restaurant.ownerId) {
        return {
          ok: false,
          error: '당신은 오너가 아니므로 레스토랑을 생성할 수 없습니다.',
        };
      }
      let category: Category = null;
      if (editRestaurantInput.categoryName) {
        category = await this.categories.getOrCreate(
          editRestaurantInput.categoryName,
        );
      }
      console.log(category);
      console.log('레스토랑아이디:', editRestaurantInput.restaurantId);
      await this.restaurants.save(
        this.restaurants.create([
          {
            id: editRestaurantInput.restaurantId,
            ...editRestaurantInput,
            ...(category && { category }),
          },
        ]),
      );
      return {
        ok: true,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
