import { RedisSessionStoreFactory } from './../providers/RedisSessionStoreFactory';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';

export const useSession = app => {
    const threeHoursInMs = 3600 * 1000 * 3;

    const configService = app.get(ConfigService);
    const { secret, env, url } = configService.get('app');

    const redisStore = app.get(RedisSessionStoreFactory);

    const sessionData = {
        name: 'SessionID',
        store: redisStore,
        secret,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: threeHoursInMs,
            secure: false
        }
    };

    if (env === 'production' && url.startsWith('https')) {
        app.set('trust proxy', 1);
        sessionData.cookie.secure = true;
    }

    app.use(session(sessionData));
};
