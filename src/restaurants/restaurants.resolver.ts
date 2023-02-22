import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInputDto } from './dto/createRestaurantInput.dto';

@Resolver((of) => Restaurant)
export class RestaurantsResolver {
  @Query((returns) => [Restaurant])
  restaurant(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    console.log(veganOnly);
    return [];
  }
  @Mutation((returns) => Boolean)
  createRestaurant(
    @Args()
    createRestaurantInput: CreateRestaurantInputDto,
  ): boolean {
    return true;
  }
}
