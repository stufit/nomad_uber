import { ArgsType, Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantInputDto } from './createRestaurantInput.dto';

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantInputDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field((type) => Number)
  id: number;
  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
