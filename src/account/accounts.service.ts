import { Inject, Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(@Inject('ACCOUNT_REPOSITORY') private readonly accountRepository: Repository<Account>) {}

  private readonly accounts: Account[] = [];

  createAccount(accountDto: AccountDto): Account {
    return accountDto.of();
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }
}

// https://github.com/nestjs/nest/issues/552 dto => domain 참조
