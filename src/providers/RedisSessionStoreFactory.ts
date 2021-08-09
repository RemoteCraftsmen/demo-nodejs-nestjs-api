import { Injectable, Logger, Inject } from '@nestjs/common';
import { RedisClientFactory } from './RedisClientFactory';

import * as session from 'express-session';
import * as createRedisStore from 'connect-redis';

@Injectable()
export class RedisSessionStoreFactory {
    constructor(private redisClient: RedisClientFactory) {
        const RedisStore = createRedisStore(session);

        const id = Math.random().toString(36).substring(2);
        const logger = new Logger();
        logger.verbose(`Redis store instance created #ID ${id}`);

        return new RedisStore({ client: this.redisClient });
    }
}
