import { Inject, Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY') private readonly accountRepository: Repository<Account>
  ) {}

  async createAccount(accountDto: AccountDto): Promise<Account> {
    console.log(`createAccount method called`);
    return accountDto.of();
  }

  async findAll(): Promise<Account[]> {
    console.log(`find all method called`);
    return this.accountRepository.find();
  }
}
