import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from '../account/accounts.service';
import {Account} from '../account/account.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  // Token에 있는 email과 실제 email을 비교.
  async validateAccount(payload: JwtPayload): Promise<any> {
    const account: Account = await this.accountsService.findByEmail(payload.email);
    if (account.getEmail() == payload.email) {
      console.log(`validateAccount Success`);
      const {...result} = account;
      return result;
    }
    return null;
  }

  // Account를 받으면 JWT토큰을 새로 발급한다.
  makeAccessToken(account: Account) {
    return this.jwtService.sign({'email': account.getEmail()});
  };
}
