import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantInput } from './createRestaurant.dto';
import { CoreOutput } from '../../common/dto/output.dto';

@InputType()
export class EditRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field((type) => Number)
  restaurantId: number;
}

@ObjectType()
export class EditRestaurantOutput extends CoreOutput {}
