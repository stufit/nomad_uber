import { MutationOutput } from '../../common/dto/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends MutationOutput {
  @Field((type) => String)
  token: string;
}
