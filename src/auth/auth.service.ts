import { Injectable } from '@nestjs/common';
import { AccountsService } from '../account/accounts.service';
import {Account} from '../account/account.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  async createToken() {
    const account: JwtPayload = {email: 'jwt-email', password: 'jwt-password'};
    const accessToken = this.jwtService.sign(account);
    return {
      expiresIn: 3600,
      accessToken,
    }
  }

  async validateAccount(payload: JwtPayload): Promise<any> {
    const account: Account = await this.accountsService.findByEmail(payload.email);
    console.log(`validateAccount에서 account ${JSON.stringify(account)}`);
    if (account && account.getPassword() == payload.password) {
      const {getPassword, ...result} = account;
      console.log(`auth service에서 result ${JSON.stringify(result)}`);
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const payload = {email, password}
    return {
      email,
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    }
  }
}
