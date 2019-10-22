import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import * as session from 'express-session';

import { AppModule } from '../src/app.module';

import { AuthService } from '../src/modules/auth/auth.service';
import { UserService } from '../src/modules/user/user.service';

const redisLib = require('redis');
const config = require('../src/config');

const RedisStore = require('connect-redis')(session);

const redisClient = redisLib.createClient({
    ...config.redis
});

const redisStore = new RedisStore({
    client: redisClient
});

describe('Auth Controller', () => {
    let API;
    let app: INestApplication;
    let authService;
    let userService;

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
        userService = app.get<UserService>(UserService);
    });

    beforeEach(async () => {
        await authService.truncate();
    });

    it(`POST /api/auth/register`, async () => {
        const registerResponse = await API.post('/api/auth/register').send({
            ...userCredentials,
            password_confirmation: userCredentials.password
        });

        const user = await userService.findOne({ email: userCredentials.email });

        expect(registerResponse.status).toEqual(HttpStatus.OK);
        expect(!!user).toBeTruthy();
    });

    it(`POST /api/auth/login`, async () => {
        await API.post('/api/auth/register').send({
            ...userCredentials,
            password_confirmation: userCredentials.password
        });

        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        const response = await API.get('/api/tasks').set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.OK);
        expect(response.body.tasks.length).toEqual(0);
    });

    it(`POST /api/auth/logout`, async () => {
        await API.post('/api/auth/register').send({
            ...userCredentials,
            password_confirmation: userCredentials.password
        });

        const { headers } = await API.post('/api/auth/login').send(userCredentials);

        const cookies = headers['set-cookie'][0];

        await API.get('/api/auth/logout').set('Cookie', cookies);

        const response = await API.get('/api/tasks').set('Cookie', cookies);

        expect(response.status).toEqual(HttpStatus.UNAUTHORIZED);
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
