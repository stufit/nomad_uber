import { Restaurant } from './entities/restaurants.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
export declare class RestaurantsResolver {
    restaurants(veganOnly: string): Restaurant[];
    createRestaurant(createRestaurantDto: CreateRestaurantDto): boolean;
}
