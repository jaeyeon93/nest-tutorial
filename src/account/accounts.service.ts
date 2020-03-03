import { Injectable } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { AccountsRepository } from './accounts.repository';

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {};

  async createAccount(accountDto: AccountDto): Promise<Account> {
    const account: Account = accountDto.of();
    console.log(`생성된 account : ${JSON.stringify(account)}`);
    return await this.accountsRepository.save(account);
  }

  async findAll(): Promise<Account[]> {
    console.log(`find all method called`);
    return await this.accountsRepository.find();
  }

  async findOne(id: string): Promise<Account> {
    console.log(`findOne method called ${id}`);
    return await this.accountsRepository.findOne(id);
  }

  async updateAccount(id: string, email: string, password: string): Promise<Account> {
    const before: Account = await this.findOne(id);
    const temp: AccountDto = before.of().update(email, password);
    return await this.accountsRepository.save(temp.of());
  }

  async remove(id: string): Promise<void> {
    console.log(`id : ${id} typeof id ${typeof id}`);
    await this.accountsRepository.delete(id);
  }
}
