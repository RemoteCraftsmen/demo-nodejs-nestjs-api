import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () =>
            await createConnection({
                name: 'default',
                type: 'mysql',
                host: '127.0.0.1',
                port: 3388,
                username: 'todo',
                password: 'todo',
                database: 'todo',
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                synchronize: false
            })
    }
];
