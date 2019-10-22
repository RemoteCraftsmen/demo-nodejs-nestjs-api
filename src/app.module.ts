import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoController } from './controllers/todo.controller';
import { AuthController } from './controllers/auth.controller';

import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';

import { TodoService } from './modules/todo/todo.service';
import { UserService } from './modules/user/user.service';
import { AuthService } from './modules/auth/auth.service';

import { todoProviders } from './modules/todo/todo.providers';
import { userProviders } from './modules/user/user.providers';
import { databaseProviders } from './providers/database.providers';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
    imports: [TodoModule, UserModule],
    controllers: [AppController, TodoController, AuthController],
    providers: [
        AppService,
        TodoService,
        UserService,
        AuthService,
        ...userProviders,
        ...todoProviders,
        ...databaseProviders
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(TodoController);
    }
}
