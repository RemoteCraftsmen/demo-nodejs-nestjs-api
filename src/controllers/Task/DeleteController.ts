import { User } from '../../entities/User';
import { TasksService } from '../../services/TasksService';
import { Controller, Delete, Response, HttpStatus, Param } from '@nestjs/common';
import { getUser } from 'src/decorators/getUser';

@Controller('api')
export class DeleteController {
    constructor(private tasksService: TasksService) {}

    @Delete('tasks/:id')
    async invoke(@Param('id') id: string, @getUser() user: User, @Response() response): Promise<void> {
        await this.tasksService.delete(id, user);

        return response.sendStatus(HttpStatus.NO_CONTENT);
    }
}
