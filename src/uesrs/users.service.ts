import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dto/createAccount.dto';
import { LoginInput } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    console.log('제이떠블유티', jwtService);
  }

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

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // [3] : JWT 생성
    try {
      // [1] : 유저이 이메일 찾기
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: '유저를 찾을 수 없습니다.',
        };
      }
      // [2] : 패스워드 일치 확인
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '비밀번호가 틀렸습니다.',
        };
      }
      // const token = jwt.sign({ id: user.id }, this.config.get('SECRET_KEY'));
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }
}
