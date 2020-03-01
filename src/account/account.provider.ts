import {Connection, Repository} from 'typeorm';
import {Account} from './account.entity'

export const accountProvider = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Account),
    inject: ['DATABASE_CONNECTION'],
  },
];
