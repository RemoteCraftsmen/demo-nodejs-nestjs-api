import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './modules/todo/todo.module';
import { TodoService } from './modules/todo/todo.service';
import { todoProviders } from './modules/todo/todo.providers';
import { databaseProviders } from './providers/database.providers';

@Module({
    imports: [TodoModule],
    controllers: [AppController, TodoController],
    providers: [AppService, TodoService, ...todoProviders, ...databaseProviders],
})
export class AppModule {}
