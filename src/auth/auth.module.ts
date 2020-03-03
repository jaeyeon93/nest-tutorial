import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountsService } from '../account/accounts.service';

@Module({
  imports: [AccountsService],
  providers: [AuthService]
})
export class AuthModule {}
