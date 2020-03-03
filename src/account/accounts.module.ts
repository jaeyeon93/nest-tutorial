import {Module} from '@nestjs/common';
import {AccountsController} from './accounts.controller';
import {AccountsService} from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsRepository } from './accounts.repository';

@Module({
  // imports: [TypeOrmModule.forFeature([Account])],
  imports: [TypeOrmModule.forFeature([AccountsRepository])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})

export class AccountsModule {}
