import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { AccountEntity } from './account.entity';

@Controller('accounts')
export class AccountsController {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  constructor(private readonly accountsService: AccountsService) {};

  // @Get()
  // async getAccountsById(): Promise<AccountEntity[]> {
  //   return this.accountsService.findAllAccount();
  // }

  @Get(':id')
  findById(@Param() params): string {
    console.log(params.id);
    return `2This action returns a ${params.id}`;
  };

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  createAccount(@Body() accountDto: AccountDto) {
    const result: AccountEntity = this.accountsService.createAccount(accountDto);
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
