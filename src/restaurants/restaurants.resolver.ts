import { Args, Mutation, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dto/createRestaurant.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../uesrs/entities/user.entity';
import { Role } from '../auth/role.decorater';
import {
  EditRestaurantInput,
  EditRestaurantOutput,
} from './dto/editRestaurant.dto';
import {
  DeleteRestaurantInput,
  DeleteRestaurantOutput,
} from './dto/deleteRestaurant.dto';
import { Category } from './entities/category.entity';
import { AllCategoriesOutput } from './dto/allCategory.dto';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => CreateRestaurantOutput)
  @Role(['Owner'])
  async createRestaurant(
    @AuthUser() authUser: User,
    @Args('input')
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<CreateRestaurantOutput> {
    return await this.restaurantService.createRestaurantService(
      authUser,
      createRestaurantInput,
    );
  }

  @Mutation((returns) => EditRestaurantOutput)
  @Role(['Owner'])
  editRestaurant(
    @AuthUser() owner: User,
    @Args('input') editRestaurantInput: EditRestaurantInput,
  ): Promise<EditRestaurantOutput> {
    return this.restaurantService.editRestaurantService(
      owner,
      editRestaurantInput,
    );
  }

  @Mutation((returns) => EditRestaurantOutput)
  @Role(['Owner'])
  async deleteRestaurant(
    @AuthUser() owner: User,
    @Args('input') deleteRestaurantInput: DeleteRestaurantInput,
  ): Promise<DeleteRestaurantOutput> {
    return await this.restaurantService.deleteRestaurantService(
      owner,
      deleteRestaurantInput,
    );
  }
}

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  // 해당 리졸버는 db나 entity에는 생기지 않음. dynamic field 라고 불림.
  @ResolveField((type) => Number)
  restaurantCount(): number {
    return 80;
  }

  @Query((returns) => AllCategoriesOutput)
  async allCategories(): Promise<AllCategoriesOutput> {
    return await this.restaurantService.allCategoryService();
  }
}
