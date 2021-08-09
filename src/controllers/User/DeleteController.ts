import { UsersService } from '../../services/UsersService';
import { Controller, Param, Delete, Response, HttpStatus } from '@nestjs/common';

@Controller('api')
export class DeleteController {
    constructor(private usersService: UsersService) {}

    @Delete('users/:id')
    async invoke(@Param('id') id: string, @Response() res): Promise<void> {
        await this.usersService.delete(id);

        return res.sendStatus(HttpStatus.NO_CONTENT);
    }
}
