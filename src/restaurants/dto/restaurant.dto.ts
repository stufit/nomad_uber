import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import {
  PaginationInput,
  PaginationOutput,
} from '../../common/dto/pagination.dto';
import { Restaurant } from '../entities/restaurant.entity';
import { CoreOutput } from '../../common/dto/output.dto';

@InputType()
export class RestaurantInput {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class RestaurantOutput extends CoreOutput {
  @Field((type) => Restaurant, { nullable: true })
  restaurant?: Restaurant;
}
