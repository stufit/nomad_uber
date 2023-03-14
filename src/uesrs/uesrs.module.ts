import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '../jwt/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ConfigService, JwtService, UsersService, UsersResolver],
})
export class UesrsModule {}
