import { UpdateUserDto } from '@/dto/UpdateUserDto';
import { UsersService } from '@/services/UsersService';
import { User } from '@/entities/User';
import { Controller, Patch, Param, Body } from '@nestjs/common';

@Controller('api')
export class UpdateController {
    constructor(private usersService: UsersService) {}

    @Patch('users/:id')
    invoke(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<User> {
        return this.usersService.update(id, user);
    }
}
