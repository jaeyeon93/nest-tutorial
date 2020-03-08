import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put, Request, UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { ResponseDto } from '../dto/responseDto';
import { LocalAuthGuard } from '../auth/strategy/local-auth.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {};

  @Get('all')
  async getAccountsById(): Promise<Account[]> {
    console.log(`GET /accounts/all called`);
    return await this.accountsService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Get()
  async login(@Request() req): Promise<any> {
    console.log(`GET /accounts query ${JSON.stringify(req.query)}`);
    const result = await this.accountsService.login(req.query.email, req.query.password);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Request() req): Promise<ResponseDto> {
    console.log(`GET /accounts/:id param ${JSON.stringify(req.params)}`);
    return await this.accountsService.getAccountById(req.params.id, req.user.id);
  };

  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async createAccount(@Body() accountDto: AccountDto): Promise<ResponseDto> {
    console.log(`POST /accounts body ${JSON.stringify(accountDto)}`);
    const response: ResponseDto = await this.accountsService.createAccount(accountDto);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Request() req): Promise<ResponseDto> {
    console.log(`PUT /accounts/:id param ${JSON.stringify(req.params)}`);
    if (!this.accountsService.compareUserId(req.params.id, req.user.id))
      throw new UnauthorizedException("수정권한이 없습니다.");
    return await this.accountsService.updateAccount(req.params.id, req.body.email, req.body.password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Request() req): Promise<any> {
    console.log(`DELETE /accounts/:id param ${JSON.stringify(req.params)}`);
    if (!this.accountsService.compareUserId(req.params.id, req.user.id))
      throw new UnauthorizedException("삭제할 권한 없습니다.");
    return await this.accountsService.remove(req.params.id);
  }
}
