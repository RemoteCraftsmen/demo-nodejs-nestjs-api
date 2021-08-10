import { UsersService } from '@/services/UsersService';
import { User } from '@/entities/User';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api')
export class ShowController {
    constructor(private usersService: UsersService) {}

    @Get('users/:id')
    invoke(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }
}
