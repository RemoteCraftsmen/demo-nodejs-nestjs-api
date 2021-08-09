import { Task } from '../../entities/Task';
import { User } from '../../entities/User';
import { getUser } from '../../decorators/getUser';
import { CreateTaskDto } from '../../dto/CreateTaskDto';
import { Post, Controller, Body } from '@nestjs/common';
import { TasksService } from 'src/services/TasksService';

@Controller('api/')
export class CreateController {
    constructor(private tasksService: TasksService) {}

    @Post('/tasks')
    invoke(@Body() createTaskDto: CreateTaskDto, @getUser() user: User): Promise<Task> {
        return this.tasksService.create(createTaskDto, user);
    }
}
