import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AccountsModule} from './account/accounts.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import {ConfigModule} from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({isGlobal: true}), AccountsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('accounts');
  }
}
