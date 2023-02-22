import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';

// @InputType()
@ArgsType()
export class CreateRestaurantInputDto {
  @Field((type) => String)
  @IsString()
  @Length(5, 10)
  name: string;
  @Field((type) => Boolean)
  isVegan: boolean;
  @Field((type) => String)
  address: string;
  @Field((type) => String)
  ownerName: string;
  @Field((type) => String)
  categoryName: string;
}
