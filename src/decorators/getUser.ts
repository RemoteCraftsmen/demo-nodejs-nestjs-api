import { User } from '@/entities/User';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUser = createParamDecorator((data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return req.session.user;
});
