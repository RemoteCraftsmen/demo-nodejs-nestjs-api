import { UpdateTaskDto } from '../dto/UpdateTaskDto';
import { User } from '../entities/User';
import { CreateTaskDto } from '../dto/CreateTaskDto';
import { Task } from '../entities/Task';
import { InjectRepository } from '@nestjs/typeorm';
import { TasksRepository } from '../repositories/TasksRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from 'src/enums/TaskStatusEnum';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}

    findAll(user: User): Promise<Task[]> {
        return this.tasksRepository.find({ user });
    }

    async findOne(id: string, user: User): Promise<Task> {
        const task = await this.tasksRepository.findOne({ id, user });

        if (!task) {
            throw new NotFoundException();
        }

        return task;
    }

    async create({ title, description }: CreateTaskDto, user: User): Promise<Task> {
        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user
        });

        await this.tasksRepository.save(task);

        return task;
    }

    async update(id: string, { title, description, status }: UpdateTaskDto, user: User): Promise<Task> {
        const taskToUpdate = await this.findOne(id, user);
        const updatedTask = { ...taskToUpdate, title, description, status };

        await this.tasksRepository.save(updatedTask);

        return updatedTask;
    }

    delete(id: string, user: User): Promise<DeleteResult> {
        return this.tasksRepository.delete({ id, user });
    }
}
