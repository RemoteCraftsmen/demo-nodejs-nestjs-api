import { getUser } from '@/decorators/getUser';
import { User } from '@/entities/User';
import { TasksService } from '@/services/TasksService';
import { Task } from '@/entities/Task';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('api')
export class ShowController {
    constructor(private tasksService: TasksService) {}

    @Get('tasks/:id')
    invoke(@Param('id') id: string, @getUser() user: User): Promise<Task> {
        return this.tasksService.findOne(id, user);
    }
}
