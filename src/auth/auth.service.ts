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
    console.log(`auth에서 validate account호출`);
    const account: Account = await this.accountsService.findByEmail(payload.email);
    if (account && account.getPassword() == payload.password) {
      const {getPassword, ...result} = account;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    console.log(`auth에서 login호출`);
    const payload = {email, password}
    return {
      email,
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    }
  }

}
