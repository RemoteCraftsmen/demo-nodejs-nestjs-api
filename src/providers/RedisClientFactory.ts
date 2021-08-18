import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const redis = require('redis');

@Injectable()
export class RedisClientFactory {
    constructor(private configService: ConfigService) {
        const redisClient = redis.createClient(this.configService.get('redis'));

        const id = Math.random().toString(36).substring(2);

        const logger = new Logger();
        logger.verbose(`Redis client instance created #ID ${id}`);

        return redisClient;
    }
}
