import { TaskStatus } from '../enums/TaskStatusEnum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}
