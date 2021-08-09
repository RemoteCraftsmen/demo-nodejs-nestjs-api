import { Get, Controller, Response, HttpStatus, Request } from '@nestjs/common';

@Controller('api/auth')
export class LogoutController {
    @Get('logout')
    invoke(@Request() request, @Response() response) {
        request.session.destroy();

        return response.sendStatus(HttpStatus.OK);
    }
}
