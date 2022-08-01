import { Query, Resolver } from '@nestjs/graphql';
import { RestaurantsEntity } from './entities/restaurants.entity';

@Resolver((of) => RestaurantsEntity)
export class RestaurantsResolver {
  @Query((returns) => RestaurantsEntity)
  myRestaurant() {
    return true;
  }
}
