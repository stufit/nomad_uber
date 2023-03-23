import { Injectable } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Raw, Repository } from 'typeorm';
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
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dto/deleteRestaurant.dto';
import { AllCategoriesOutput } from './dto/allCategory.dto';
import { CategoryInput, CategoryOutput } from './dto/category.dto';
import { RestaurantsInput, RestaurantsOutput } from './dto/restaurants.dto';
import { RestaurantInput, RestaurantOutput } from './dto/restaurant.dto';
import {
  SearchRestaurantInput,
  SearchRestaurantOutput,
} from './dto/searchRestaurant.dto';
import { CreateDishInput, CreateDishOutput } from './dto/createDish.dto';

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
      const restaurant = await this.restaurants.findOne({
        where: { id: editRestaurantInput.restaurantId },
      });
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

  async deleteRestaurantService(
    owner: User,
    { restaurantId }: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantId },
      });
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
      await this.restaurants.delete(restaurantId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: '삭제할 수 없습니다.',
      };
    }
  }

  async allCategoryService(): Promise<AllCategoriesOutput> {
    try {
      const categories = await this.categories.find();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error: '카테고리를 불러올 수 없습니다.',
      };
    }
  }

  counstRestaurantService(category: Category) {
    return this.restaurants.count({ where: { category: { id: category.id } } });
  }

  async findCategoryBySlugService({
    slug,
    page,
  }: CategoryInput): Promise<CategoryOutput> {
    try {
      const category = await this.categories.findOne({
        where: { slug: slug },
        relations: ['restaurants'],
      });
      console.log('카테고리슬러그:', category);
      if (!category) {
        return {
          ok: false,
          error: '카테고리가 존재하지 않습니다.',
        };
      }
      const restaurants = await this.restaurants.find({
        where: { category: { id: category.id } },
        take: 25,
        skip: (page - 1) * 25,
      });
      category.restaurants = restaurants;
      const totalResults = await this.counstRestaurantService(category);
      return {
        ok: true,
        category,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error: '카테고리를 불러올 수 없습니다.',
      };
    }
  }

  async allRestaurantService({
    page,
  }: RestaurantsInput): Promise<RestaurantsOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        results: restaurants,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error: '레스토랑을 찾을 수 없습니다.',
      };
    }
  }

  async findRestaurantByIdService(
    restaurantInput: RestaurantInput,
  ): Promise<RestaurantOutput> {
    try {
      const restaurant = await this.restaurants.findOne({
        where: { id: restaurantInput.restaurantId },
        relations: ['menu'],
      });
      if (!restaurant) {
        return {
          ok: false,
          error: '레스토랑을 찾을 수 없습니다.',
        };
      }
      return {
        ok: true,
        restaurant,
      };
    } catch (error) {
      return {
        ok: false,
        error: '레스토랑을 찾을 수 없습니다.',
      };
    }
  }

  async searchRestaurantByNameService({
    query,
    page,
  }: SearchRestaurantInput): Promise<SearchRestaurantOutput> {
    try {
      const [restaurants, totalResults] = await this.restaurants.findAndCount({
        where: {
          // name: ILike(`%${query}%`), // ILike 는 대소문자 구분하지 않고 찾아준다.
          name: Raw((name) => `${name} ILIKE '%${query}%'`),
        },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        restaurants,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error: '레스토랑을 찾을 수 없습니다.',
      };
    }
  }
  async createDishService(
    owner: User,
    createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    return {
      ok: false,
    };
  }
}
