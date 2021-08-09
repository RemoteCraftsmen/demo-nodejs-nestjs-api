import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as session from 'express-session';

import { AppModule } from '../src/AppModule';

import { AuthService } from '../src/modules/auth/auth.service';
import { TodoService } from '../src/modules/todo/todo.service';

import { User } from '../src/entities/User';

const redisLib = require('redis');
const config = require('../src/config');

const RedisStore = require('connect-redis')(session);

const redisClient = redisLib.createClient({
    ...config.redis
});

const redisStore = new RedisStore({
    client: redisClient
});

describe('Todo Controller', () => {
    let API;
    let app: INestApplication;
    let authService;
    let todoService;
    let user: User;

    const userCredentials = {
        email: 'test@todo.test',
        password: 'somePassword'
    };

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication();

        app.use(
            session({
                store: redisStore,
                secret: config.app.secret,
                resave: false,
                saveUninitialized: false
            })
        );

        await app.init();

        API = request(app.getHttpServer());

        authService = app.get<AuthService>(AuthService);
        todoService = app.get<TodoService>(TodoService);
    });

    beforeEach(async () => {
        await authService.truncate();
        await todoService.truncate();

        user = await authService.register(userCredentials.email, userCredentials.password);
    });

    it(`GET /api/tasks`, async () => {
        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        await todoService.create('test1', user.id);
        await todoService.create('test2', user.id);

        const response = await API.get('/api/tasks').set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.tasks.length).toEqual(2);
    });

    it(`POST /api/tasks`, async () => {
        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        const response = await API.post(`/api/tasks`)
            .send({
                name: 'test'
            })
            .set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.CREATED);
        expect(response.body.name).toEqual('test');
        expect(response.body.user_id).toEqual(user.id);
    });

    it(`GET /api/tasks/{id}`, async () => {
        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        const task = await todoService.create('test1', user.id);

        const response = await API.get(`/api/tasks/${task.id}`).set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.name).toEqual(task.name);
        expect(response.body.user_id).toEqual(user.id);
    });

    it(`PATCH /api/tasks/{id}`, async () => {
        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        const task = await todoService.create('test1', user.id);

        const response = await API.patch(`/api/tasks/${task.id}`)
            .send({
                name: 'updated'
            })
            .set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.name).toEqual('updated');
        expect(response.body.user_id).toEqual(user.id);
    });

    it(`DELETE /api/tasks/{id}`, async () => {
        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        const task = await todoService.create('test1', user.id);

        await API.delete(`/api/tasks/${task.id}`).set('Cookie', cookies);

        const response = await API.get(`/api/tasks/${task.id}`).set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.NOT_FOUND);
    });

    afterAll(async () => {
        await new Promise(resolve => {
            redisClient.quit(() => {
                resolve();
            });
        });

        await new Promise(resolve => setImmediate(resolve));

        await app.close();
    });
});
