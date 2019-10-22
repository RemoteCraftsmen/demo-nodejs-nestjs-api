import { AuthService } from '../modules/auth/auth.service';
import { Get, Post, Controller, Body, Response, HttpStatus, Request } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Request() request,
        @Response() response
    ) {
        try {
            const user = await this.authService.login(email, password);

            request.session.user_id = user.id;
        } catch (error) {
            return response.sendStatus(HttpStatus.UNAUTHORIZED);
        }

        return response.sendStatus(HttpStatus.OK);
    }

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('password_confirmation') password_confirmation: string,
        @Request() request,
        @Response() response
    ) {
        if (password !== password_confirmation) {
            return response.sendStatus(HttpStatus.BAD_REQUEST);
        }

        try {
            const user = await this.authService.register(email, password);

            request.session.user_id = user.id;
        } catch (error) {
            return response.sendStatus(HttpStatus.BAD_REQUEST);
        }

        return response.sendStatus(HttpStatus.OK);
    }

    @Get('logout')
    logout(@Request() request, @Response() response) {
        request.session.destroy();

        return response.sendStatus(HttpStatus.OK);
    }
}
