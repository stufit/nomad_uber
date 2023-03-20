import {
  ArgsType,
  Field,
  InputType,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';
import { CoreOutput } from '../../common/dto/output.dto';

// @InputType()
@InputType()
export class CreateRestaurantInput extends OmitType(
  Restaurant,
  ['id', 'category', 'owner'],
  InputType,
) {}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
