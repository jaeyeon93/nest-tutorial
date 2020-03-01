import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AccountsModule} from './account/accounts.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AccountsModule,
  TypeOrmModule.forRoot(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('accounts');
  }
}
