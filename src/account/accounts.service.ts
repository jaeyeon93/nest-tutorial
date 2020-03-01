import {Injectable} from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account';

@Injectable()
export class AccountsService {
  private readonly accounts: Account[] = [];

  createAccount(accountDto: AccountDto): AccountDto {
    const result: boolean = accountDto instanceof AccountDto;
    console.log(result);
    return accountDto;
  }

  findAllAccount(): Account[] {
    return this.accounts;
  }
}

// https://github.com/nestjs/nest/issues/552 dto => domain 참조
