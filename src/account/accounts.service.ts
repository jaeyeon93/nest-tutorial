import {Injectable} from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account';

@Injectable()
export class AccountService {
  private readonly accounts: Account[] = [];

  createAccount(accountDto: AccountDto): AccountDto {
    console.log(`account dto 전달 ${JSON.stringify(accountDto)}`);
    console.log(typeof accountDto);
    // console.log(accountDto.of());
    return accountDto;
  }

  findAllAccount(): Account[] {
    return this.accounts;
  }
}
