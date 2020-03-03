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
    const account: JwtPayload = {id: 'jwt-id', email: 'jwt-email', password: 'jwt-password'};
    const accessToken = this.jwtService.sign(account);
    return {
      expiresIn: 3600,
      accessToken,
    }
  }

  async validateAccount(payload: JwtPayload): Promise<any> {
    const account: Account = await this.accountsService.findOne(payload.id);
    console.log(`validateAccount에서 account ${JSON.stringify(account)}`);
    if (account && account.getPassword() == payload.password) {
      const {getPassword, ...result} = account;
      return result;
    }
    return null;
  }

  async login(account: any) {
    const payload = {id: account.getId(), email: account.getEmail(), password: account.getPassword()}
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    }
  }
}
