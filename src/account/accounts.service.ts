import {Injectable} from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountsService {
  private readonly accounts: AccountEntity[] = [];

  createAccount(accountDto: AccountDto): AccountEntity {
    const result: boolean = accountDto instanceof AccountDto;
    console.log(`account ${JSON.stringify(accountDto)}`)
    return accountDto.of();
  }

  findAllAccount(): AccountEntity[] {
    return this.accounts;
  }
}

// https://github.com/nestjs/nest/issues/552 dto => domain 참조
