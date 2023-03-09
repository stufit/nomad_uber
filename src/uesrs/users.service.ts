import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/createAccount.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<[boolean, string?]> {
    try {
      // check new user
      const exists = await this.users.findOne({ where: { email } }); // findOne에서 이젠 {email} 말고 {where} 붙여줘야함.
      if (exists) {
        return [false, '해당 이메일을 가진 사용자가 이미 존재합니다.'];
      }
      await this.users.save(this.users.create({ email, password, role }));
      return [true];
    } catch (e) {
      return [false, '계정을 생성할 수 없음'];
    }
  }
}
