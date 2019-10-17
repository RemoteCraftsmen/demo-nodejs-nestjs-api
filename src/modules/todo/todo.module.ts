import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { todoProviders } from './todo.providers';
import { TodoService } from './todo.service';

@Module({
    imports: [DatabaseModule],
    providers: [...todoProviders, TodoService],
})
export class TodoModule {}
