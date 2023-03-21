import { Args, Mutation, Resolver } from '@nestjs/graphql';
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
    @AuthUser() authUser: User,
    @Args('input') editRestaurant: EditRestaurantInput,
  ): EditRestaurantOutput {
    return {
      ok: true,
    };
  }
}
