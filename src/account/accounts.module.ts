import {Module} from '@nestjs/common';
import {AccountsController} from './accounts.controller';
import {AccountsService} from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsRepository } from './accounts.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([AccountsRepository])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})

export class AccountsModule {}
