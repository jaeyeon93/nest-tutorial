import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';

@Controller('accounts')
export class AccountsController {
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

  // @Put(':id')
  // async updateById(@Param() params, @Body() data): Promise<Account> {
  //   console.log(typeof data);
  //   const updatedAccount: Account = await this.accountsService.updateAccount(data.email, data.password);
  //   return updatedAccount;
  // }

  @Delete(':id')
  async deleteById(@Param() params): Promise<void> {
    return await this.accountsService.remove(params.id);
  }

  @Get('email/:email')
  async findByEmail(@Param() params): Promise<Account> {
    return await this.accountsService.findByEmail(params.email);
  }
}
