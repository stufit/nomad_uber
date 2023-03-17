import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Category } from './category.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  bgImage: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  // 여러개의 restuarant 는 1 개의 category를 갖는다.
  @ManyToOne((type) => Category, (category) => category.restaurants)
  @Field((type) => Category)
  category: Category;
}
