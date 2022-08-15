import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // Graphql
@Entity() // Typeorm
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;
  @Field((type) => String) // Graphql
  @Column() // Typeorm
  name: string;
  @Field((type) => Boolean)
  @Column()
  isVegan?: boolean;
  @Field((type) => String)
  @Column()
  address: string;
  @Field((type) => String)
  @Column()
  ownerName: string;
  @Field((type) => String)
  @Column()
  categoryName: string;
}
