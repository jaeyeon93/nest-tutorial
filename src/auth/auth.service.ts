import { Injectable } from '@nestjs/common';
import { AccountsService } from '../account/accounts.service';
import {Account} from '../account/account.entity';
import { AccountDto } from '../dto/account.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  async validateAccount(id: string, email: string, password: string): Promise<any> {
    const account: Account = await this.accountsService.findOne(id);
    console.log(`validateAccount에서 account ${JSON.stringify(account)}`);
    if (account && account.getPassword() == password) {
      const {getPassword, ...result} = account;
      return result;
    }
    return null;
  }

  async login(account: any) {
    const payload = {email: account.getEmail(), password: account.getPassword()}
    return {
      access_token: this.jwtService.sign(payload);
    }
  }
}
