
import * as request from 'supertest-session';

import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { UsersService } from '@/services/UsersService';
import { useSession } from '@/plugins/session';
import { AppModule } from '@/AppModule';
import { TasksService } from '@/services/TasksService';

export class TestService {
    public app: INestApplication;
    
    private userCredentials: { email: string; password: string } = {
        email: 'test@todo.test',
        password: 'somePassword'
    };
    private testModule;
    private usersService: UsersService;
    private tasksService: TasksService;
    api;

    initializeTestingEnvironment = async () => {
        this.testModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        this.app = this.testModule.createNestApplication();

        this.usersService = this.app.get<UsersService>(UsersService);
        this.tasksService = this.app.get<TasksService>(TasksService);

        useSession(this.app);

        await this.app.init();

        this.api = request(this.app.getHttpServer());
    };

    truncateDatabase = async () => {
        await this.tasksService.truncate();
        await this.usersService.truncate();
    };
}
