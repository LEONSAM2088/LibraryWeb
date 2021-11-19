import { Connection } from 'typeorm';
import { Person } from './person.entity';

export const personProviders = [
    {
        provide: 'PERSON_REPOSITORY',
        useFactory: (connection: Connection) => connection.getRepository(Person),
        inject: ['DATABASE_CONNECTION'],
    },
];