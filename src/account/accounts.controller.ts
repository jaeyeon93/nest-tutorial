import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put, Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { JwtStrategy } from '../auth/jwt.strategy';
import { ResponseDto } from '../dto/responseDto';
import { LocalStrategy } from '../auth/local.strategy';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {};

  @Get()
  async getAccountsById(): Promise<Account[]> {
    return await this.accountsService.findAll();
  }

  // @Get(':id')
  // async findById(@Param() params): Promise<Account> {
  //   console.log(params.id);
  //   return await this.accountsService.findOne(params.id);
  // };

  @UseGuards(LocalStrategy)
  @Get('')
  async login(@Request() req): Promise<any> {
    return await this.accountsService.login(req.query.email, req.query.password);
  }

  @UseGuards(JwtStrategy)
  @Get(':id')
  async findById(@Request() req): Promise<ResponseDto> {
    return await this.accountsService.getAccountById(req.params.id, req.user.id);
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
