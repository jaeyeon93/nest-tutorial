import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';

@Controller('accounts')
export class AccountsController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  constructor(private readonly accountsService: AccountsService) {};

  @Get()
  async getAccountsById(): Promise<Account[]> {
    return await this.accountsService.findAll();
  }

  @Get(':id')
  async findById(@Param() params): Promise<Account> {
    console.log(params.id);
    return await this.accountsService.findOne(params.id);
  };

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async createAccount(@Body() accountDto: AccountDto) {
    const result: Account = await this.accountsService.createAccount(accountDto);
    return JSON.stringify(result);
  }

  @Put(':id')
  updateById(@Param() params): string {
    console.log(`updateById : ${params.id}`);
    return `PUT /accounts/${params.id}`;
  }

  @Delete(':id')
  async deleteById(@Param() params): Promise<void> {
    return await this.accountsService.remove(params.id);;
  }
}
