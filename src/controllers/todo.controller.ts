import { Controller, Get, Post, Param, Patch, Body, Delete, Response, HttpStatus, Request } from '@nestjs/common';
import { TodoService } from '../modules/todo/todo.service';
import { Todo } from '../modules/todo/todo.entity';

@Controller('api/tasks')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    async index(@Request() request): Promise<Object> {
        const tasks = await this.todoService.get({
            user_id: request.session.user_id
        });

        return { tasks };
    }

    @Get(':id')
    async show(@Param('id') id, @Request() request, @Response() response) {
        const todo = await this.todoService.find(id);

        if (!todo) {
            return response.sendStatus(HttpStatus.NOT_FOUND);
        }

        if (todo.user_id !== request.session.user_id) {
            return response.sendStatus(HttpStatus.FORBIDDEN);
        }

        return todo;
    }

    @Post()
    async store(@Body('name') name: string, @Request() request): Promise<Todo> {
        return this.todoService.create(name, request.session.user_id);
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() body: Body, @Request() request, @Response() response) {
        const todo = await this.todoService.find(id);

        if (!todo) {
            return response.sendStatus(HttpStatus.NOT_FOUND);
        }

        if (todo.user_id !== request.session.user_id) {
            return response.sendStatus(HttpStatus.FORBIDDEN);
        }

        await this.todoService.update(id, body);

        const updatedTodo = await this.todoService.find(id);

        return response.status(HttpStatus.OK).json(updatedTodo);
    }

    @Delete(':id')
    async destroy(@Param('id') id, @Request() request, @Response() response) {
        const todo = await this.todoService.find(id);

        if (!todo) {
            return response.sendStatus(HttpStatus.NOT_FOUND);
        }

        if (todo.user_id !== request.session.user_id) {
            return response.sendStatus(HttpStatus.FORBIDDEN);
        }

        await this.todoService.delete(id);

        return response.sendStatus(HttpStatus.OK);
    }
}
