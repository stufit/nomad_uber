import { NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

export function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  next();
}

/*
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers);
    next();
  }
}
 */
