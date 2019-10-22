import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(request, response, next: Function) {
        if (request.session && request.session.user_id) {
            return next();
        }

        throw new UnauthorizedException();
    }
}
