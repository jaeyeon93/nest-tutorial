import {Injectable} from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account';

@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];

  createAccount(accountDto: AccountDto): Account {
    const result: boolean = accountDto instanceof AccountDto;
    console.log(`account ${JSON.stringify(accountDto)}`)
    return accountDto.of();
  }

  findAllAccount(): Account[] {
    return this.accounts;
  }
}

// https://github.com/nestjs/nest/issues/552 dto => domain 참조
