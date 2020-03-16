import { Body, Controller, Delete, Get, Post, Put, Request, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { ResponseDto } from '../dto/responseDto';
import { LocalAuthGuard } from '../auth/strategy/local-auth.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOkResponse, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {};

  @Get('all')
  async getAllAccounts(): Promise<Account[]> {
    return await this.accountsService.findAll();
  }

  @ApiQuery({name: 'email', description: 'need to email'})
  @ApiQuery({name: 'password', description: 'need to password'})
  @ApiResponse({status: 200, description: 'Success to login', type: ResponseDto})
  @UseGuards(LocalAuthGuard)
  @Get()
  async login(@Request() req): Promise<any> {
    const result = await this.accountsService.login(req.query.email, req.query.password);
    return result;
  }

  @ApiHeader({ name: 'Authorization', description: 'accessToken'})
  @ApiOkResponse({type: ResponseDto})
  @ApiParam({name: 'uuid', description: 'need to uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Request() req): Promise<ResponseDto> {
    return await this.accountsService.getAccountById(req.params.id, req.user.id);
  };

  @ApiBody({type: AccountDto})
  @ApiResponse({status: 201, description: 'Create Account successfully', type: ResponseDto})
  @Post()
  @UsePipes(new ValidationPipe({transform: true}))
  async createAccount(@Body() accountDto: AccountDto): Promise<ResponseDto> {
    const response: ResponseDto = await this.accountsService.createAccount(accountDto);
    return response;
  }

  @ApiHeader({ name: 'Authorization', description: 'accessToken' })
  @ApiOkResponse({description: 'update', type: ResponseDto})
  @ApiParam({name: 'uuid', description: '{id} is uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Request() req): Promise<ResponseDto> {
    if (!this.accountsService.compareUserId(req.params.id, req.user.id))
      throw new UnauthorizedException("수정권한이 없습니다.");
    return await this.accountsService.updateAccount(req.params.id, req.body.email, req.body.password);
  }

  @ApiHeader({ name: 'Authorization', description: 'accessToken' })
  @ApiOkResponse({description: 'deleted'})
  @ApiParam({name: 'uuid', description: '{id} is uuid'})
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(@Request() req): Promise<any> {
    if (!this.accountsService.compareUserId(req.params.id, req.user.id))
      throw new UnauthorizedException("삭제할 권한이 없습니다.");
    return await this.accountsService.remove(req.params.id);
  }
}
