import { Controller, Get, Post, Param, Patch, Body, Delete, Response, HttpStatus } from '@nestjs/common';
import { TodoService } from '../modules/todo/todo.service';
import { Todo } from '../modules/todo/todo.entity';

@Controller('todos')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @Get()
    index(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Get(':id')
    async show(@Param('id') id, @Response() response) {
        const todo = await this.todoService.find(id);

        if (!todo) {
            return response.sendStatus(HttpStatus.NOT_FOUND);
        }

        return todo;
    }

    @Post()
    async store(@Body('name') name: string): Promise<Todo> {
        return this.todoService.create(name);
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() body: Body) {
        return this.todoService.update(id, body);
    }

    @Delete(':id')
    async destroy(@Param('id') id, @Response() response) {
        const todo = await this.todoService.find(id);

        if (!todo) {
            return response.sendStatus(HttpStatus.NOT_FOUND);
        }

        await this.todoService.delete(id);

        return response.sendStatus(HttpStatus.OK);
    }
}
