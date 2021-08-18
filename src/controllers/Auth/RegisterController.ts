import { RegisterHandler } from '@/services/Auth/RegisterHandler';
import { RegisterUserDto } from '@/dto/RegisterUserDto';
import { Post, Controller, Body } from '@nestjs/common';

@Controller('api/auth')
export class RegisterController {
    constructor(private registerHandler: RegisterHandler) {}

    @Post('register')
    async invoke(@Body() registerUserDto: RegisterUserDto) {
        return this.registerHandler.handle(registerUserDto);
    }
}
