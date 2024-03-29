import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UsersService } from '../uesrs/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findByIdService(decoded['id']);
          req['user'] = user['user'];
        } catch (e) {
          console.log(e);
        }
      }
    }
    next();
  }
}
