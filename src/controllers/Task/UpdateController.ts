import { User } from '../../entities/User';
import { getUser } from '../../decorators/getUser';
import { Task } from '../../entities/Task';
import { UpdateTaskDto } from '../../dto/UpdateTaskDto';
import { TasksService } from '../../services/TasksService';
import { Controller, Patch, Param, Body } from '@nestjs/common';

@Controller('api')
export class UpdateController {
    constructor(private tasksService: TasksService) {}

    @Patch('tasks/:id')
    invoke(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @getUser() user: User): Promise<Task> {
        return this.tasksService.update(id, updateTaskDto, user);
    }
}
