import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

const redisLib = require('redis');
const config = require('./config');
const cors = require('cors');

const RedisStore = require('connect-redis')(session);

const redisClient = redisLib.createClient({
    ...config.redis
});

const redisStore = new RedisStore({
    client: redisClient
});

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const originsWhitelist = ['http://localhost:8080', config.app.frontendUrl, config.app.adminUrl];
    const corsOptions = {
        origin(origin, callback) {
            if (originsWhitelist.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS xxxx'));
            }
        },
        credentials: true
    };

    app.use(cors(corsOptions));

    app.use(
        session({
            store: redisStore,
            secret: config.app.secret,
            resave: false,
            saveUninitialized: false
        })
    );

    await app.listen(3000);
}

bootstrap();
