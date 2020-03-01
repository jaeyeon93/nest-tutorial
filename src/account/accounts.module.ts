import {Module} from '@nestjs/common';
import {AccountsController} from './accounts.controller';
import {AccountService} from './accounts.service';

@Module({
  controllers: [AccountsController],
  providers: [AccountService],
})

export class AccountsModule {}
