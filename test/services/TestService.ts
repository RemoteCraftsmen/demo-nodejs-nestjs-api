import { INestApplication } from '@nestjs/common';
import { UsersService } from '@/services/UsersService';
import { useSession } from '@/plugins/session';
import { AppModule } from '@/AppModule';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TasksService } from '@/services/TasksService';

export class TestService {
    private app: INestApplication;
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

    registerUser = () => {
        return this.api.post('/api/auth/register').send({
            ...this.userCredentials,
            passwordRepeat: this.userCredentials.password
        });
    };

    loginUser = async () => {
        return this.api.post('/api/auth/login').send(this.userCredentials);
    };

    logoutUser = () => {
        return this.api.get('/api/auth/logout');
    };

    truncateDatabase = async () => {
        await this.tasksService.truncate();
        await this.usersService.truncate();
    };
}
