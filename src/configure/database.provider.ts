import {createConnection} from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345',
      database: 'sign',
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }).then(() => console.log(`database connection success`)).catch((err) => console.log(`err ${err}`)),
  },
];
