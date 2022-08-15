import { Args, ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType() // InputType으로 하면 post 시, 무조건 전체 object를 전달해야함.
@ArgsType() // ArgsType으로 하면 post시, 분리된 argument로써 정의 할 수 있음.
export class CreateRestaurantDto {
  @Field((type) => String)
  name: string;
  @Field((type) => Boolean) isVegan: boolean;
  @Field((type) => String) address: string;
  @Field((type) => String) ownerName: string;
}
