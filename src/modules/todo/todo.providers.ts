import { Connection, Repository } from 'typeorm';
import { Todo } from './todo.entity';

export const todoProviders = [
  {
    useFactory: (connection: Connection) => connection.getRepository(Todo),
    provide: 'TODO_REPOSITORY',
    inject: ['DATABASE_CONNECTION'],
  },
];
