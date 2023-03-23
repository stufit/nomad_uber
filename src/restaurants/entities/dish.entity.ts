import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { IsNumber, IsString, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';

@InputType('DishOptionInputType', { isAbstract: true })
@ObjectType()
class DishOption {
  @Field((type) => String)
  name: string;

  @Field((type) => [String], { nullable: true })
  choices?: string[];

  @Field((type) => Number, { nullable: true })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => Number)
  @Column()
  @IsNumber()
  price: number;

  @Field((type) => String, { nullable: true })
  @Column({ nullable: true })
  @IsString()
  photo?: string;

  @Field((type) => String, { nullable: true })
  @Column()
  @Length(5, 140)
  description: string;

  @Field((type) => Restaurant, { nullable: false })
  @ManyToOne((type) => Restaurant, (restaurant) => restaurant.menu, {
    onDelete: 'CASCADE',
    nullable: false, // 레스토랑은 필수값이다. 그러므로 null 값이 있으면 안됨.
  })
  restaurant: Restaurant;

  @RelationId((dish: Dish) => dish.restaurant) //owner의 id 값을 가져온다
  restaurantId: number;

  @Field((type) => [DishOption], { nullable: true })
  @Column({ type: 'json', nullable: true })
  options?: DishOption[];
}
