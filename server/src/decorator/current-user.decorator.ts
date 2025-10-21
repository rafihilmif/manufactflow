import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRequest } from '../middleware/interfaces/user-request.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserRequest => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
