import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInputDto } from './dto/createRestaurantInput.dto';
import { RestaurantService } from './restaurant.service';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Query((returns) => [Restaurant])
  restaurant(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }
  @Mutation((returns) => Boolean)
  async createRestaurant(
    @Args('input')
    createRestaurantInput: CreateRestaurantInputDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurantService(
        createRestaurantInput,
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
