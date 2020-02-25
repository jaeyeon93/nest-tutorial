import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsController } from './accounts/accounts.controller';

@Module({
  imports: [],
  controllers: [AppController, AccountsController],
  providers: [AppService],
})
export class AppModule {}
