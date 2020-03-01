import {Module} from '@nestjs/common';
import {AccountsController} from './accounts.controller';
import {AccountsService} from './accounts.service';
import {DatabaseModule} from '../configure/database.module';
import {accountProvider} from './account.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountsController],
  providers: [AccountsService, ...accountProvider],
  exports: [AccountsService],
})

export class AccountsModule {}
