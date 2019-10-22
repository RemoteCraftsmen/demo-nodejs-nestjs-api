import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @Inject('TODO_REPOSITORY')
        private readonly todoRepository: Repository<Todo>
    ) {}

    async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    async find(id): Promise<Todo> {
        return await this.todoRepository.findOne(id);
    }

    async get(where): Promise<Todo[]> {
        return await this.todoRepository.find(where);
    }

    create(name: string, user_id: number): Promise<Todo> {
        return this.todoRepository.save({
            name,
            user_id,
            completed: false
        });
    }

    async update(id, data) {
        // @TODO: add return type
        await this.todoRepository.update(id, data);

        return this.todoRepository.find(id);
    }

    async delete(id) {
        // @TODO: add return type
        return await this.todoRepository.delete(id);
    }

    truncate() {
        return this.todoRepository.clear();
    }
}
