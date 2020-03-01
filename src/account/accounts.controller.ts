import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AccountService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account';

@Controller('accounts')
export class AccountsController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  constructor(private readonly accountsService: AccountService) {};

  // @Get()
  // async getAccountsById(): Promise<Account[]> {
  //   return this.accountsService.findAllAccount();
  // }

  @Get(':id')
  findById(@Param() params): string {
    console.log(params.id);
    return `2This action returns a ${params.id}`;
  };

  @Post()
  createAccount(@Body() accountDto: AccountDto) {
    const result: AccountDto = this.accountsService.createAccount(accountDto);
    return JSON.stringify(result);
  }

  @Put(':id')
  updateById(@Param() params): string {
    console.log(`updateById : ${params.id}`);
    return `PUT /accounts/${params.id}`;
  }

  @Delete(':id')
  deleteById(@Param() params): string {
    console.log(`Delete by id : ${params.id}`);
    return `DELETE /accounts/${params.id}`;
  }
}