import { forwardRef, Module } from '@nestjs/common';
import {AccountsController} from './accounts.controller';
import {AccountsService} from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsRepository } from './accounts.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([AccountsRepository])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})

export class AccountsModule {}
