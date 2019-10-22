import { Connection, Repository } from 'typeorm';
import { User } from './user.entity';

export const userProviders = [
    {
        useFactory: (connection: Connection) => connection.getRepository(User),
        provide: 'USER_REPOSITORY',
        inject: ['DATABASE_CONNECTION']
    }
];
