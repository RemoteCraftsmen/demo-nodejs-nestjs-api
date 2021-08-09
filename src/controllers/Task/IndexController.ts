import { User } from '@/entities/User';
import { TasksService } from '@/services/TasksService';
import { Task } from '@/entities/Task';
import { Controller, Get } from '@nestjs/common';
import { getUser } from '@/decorators/getUser';

@Controller('api')
export class IndexController {
    constructor(private tasksService: TasksService) {}

    @Get('tasks')
    invoke(@getUser() user: User): Promise<Task[]> {
        return this.tasksService.findAll(user);
    }
}
