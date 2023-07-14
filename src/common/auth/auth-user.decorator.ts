import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserEntity } from '../database';

export const AuthUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
