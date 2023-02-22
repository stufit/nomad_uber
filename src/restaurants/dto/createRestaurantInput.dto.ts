import { ArgsType, Field, InputType, OmitType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

// @InputType()
@InputType()
export class CreateRestaurantInputDto extends OmitType(
  Restaurant,
  ['id'],
  InputType,
) {}
