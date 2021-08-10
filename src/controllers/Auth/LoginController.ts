import { User } from '@/entities/User';
import { AuthCredentialsDto } from '@/dto/AuthCredentialsDto';
import { LoginHandler } from '@/services/Auth/LoginHandler';
import { Post, Controller, Body, Request } from '@nestjs/common';

@Controller('api/auth')
export class LoginController {
    constructor(private loginHandler: LoginHandler) {}

    @Post('login')
    async invoke(@Body() authCredentialsDto: AuthCredentialsDto, @Request() request): Promise<User> {
        const user = await this.loginHandler.handle(authCredentialsDto);

        request.session.user = user;

        return user;
    }
}
