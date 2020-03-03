import { Injectable } from '@nestjs/common';
import { AccountsService } from '../account/accounts.service';
import {Account} from '../account/account.entity';
import { AccountDto } from '../dto/account.dto';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService) {}

  async validateAccount(id: string, email: string, password: string): Promise<any> {
    const account: Account = await this.accountsService.findOne(id);
    console.log(`validateAccount에서 account ${JSON.stringify(account)}`);
    if (account && account.getPassword() == password) {
      const {getPassword, ...result} = account;
      return result;
    }
    return null;
  }
}
