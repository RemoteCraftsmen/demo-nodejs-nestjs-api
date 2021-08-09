import { UsersService } from '../../services/UsersService';
import { User } from '../../entities/User';
import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class IndexController {
    constructor(private usersService: UsersService) {}

    @Get('users')
    invoke(): Promise<User[]> {
        return this.usersService.findAll();
    }
}
