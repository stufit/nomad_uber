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

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categories: Repository<Category>,
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
      const categoryname = createRestaurantInput.categoryName
        .trim()
        .toLowerCase()
        .replace(/ +/g, '');
      const categorySlug = categoryname.replace(/ /g, '-');
      let category = await this.categories.findOne({
        where: { slug: categorySlug },
      });
      if (!category) {
        category = await this.categories.save(
          this.categories.create({ slug: categorySlug, name: categoryname }),
        );
      }
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
    editRestaurant: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {}
}
