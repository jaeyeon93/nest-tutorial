import { Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>
  ) {}

  async createAccount(accountDto: AccountDto): Promise<Account> {
    console.log(`createAccount method called`);
    return accountDto.of();
  }

  async findAll(): Promise<Account[]> {
    console.log(`find all method called`);
    return await this.accountsRepository.find();
  }

  findOne(id: string): Promise<Account> {
    return this.accountsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.accountsRepository.delete(id);
  }
}
