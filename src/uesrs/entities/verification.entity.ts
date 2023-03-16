import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @Field((type) => String)
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' }) // ondelete=cascade 는 만약 user가 삭제되면 해당 verification도 삭제한다는 의미이다
  @JoinColumn()
  user: User;

  @BeforeInsert() // db에서 code에 랜덤문자 자동생성
  createCode(): void {
    this.code = uuidv4();
  }
}
