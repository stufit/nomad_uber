import { CoreOutput } from '../../common/dto/output.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true }) // graphql
  categories?: Category[]; // typescript
}
