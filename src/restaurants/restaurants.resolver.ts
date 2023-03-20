import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dto/createRestaurantInput.dto';
import { AuthUser } from '../auth/auth-user.decorator';
import { User } from '../uesrs/entities/user.entity';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation((returns) => Boolean)
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
}
