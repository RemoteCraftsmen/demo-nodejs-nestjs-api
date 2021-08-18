import { TasksModule } from './modules/TasksModule';
import { UsersModule } from './modules/UsersModule';
import { AuthModule } from './modules/AuthModule';
import { RedisClientFactory } from './providers/RedisClientFactory';
import { RedisSessionStoreFactory } from './providers/RedisSessionStoreFactory';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from './middleware/AuthMiddleware';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config/schema';
import config from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            validationSchema: configValidationSchema,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const dbConfig = configService.get('db');

                return {
                    type: dbConfig.dialect,
                    ...dbConfig,
                    entities: [__dirname + '/entities/*.{ts,js}'],
                    synchronize: true
                };
            }
        }),
        AuthModule,
        UsersModule,
        TasksModule
    ],
    providers: [RedisSessionStoreFactory, RedisClientFactory]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .exclude(
                { path: '/api/auth/register', method: RequestMethod.POST },
                { path: '/api/auth/login', method: RequestMethod.POST }
            )
            .forRoutes({ path: '/api/*', method: RequestMethod.ALL });
    }
}
