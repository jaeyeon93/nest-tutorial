import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './account/accounts.controller';
import { AccountService } from './account/accounts.service';

@Module({
  imports: [],
  controllers: [AppController, AccountsController],
  providers: [AppService, AccountService],
})
export class AppModule {}
