import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
  Req,
  Put,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccountsService } from '../account/accounts.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly accountsService: AccountsService) {}

  @UseGuards(LocalAuthGuard)
  @Get('login')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.query.email, req.query.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getAccount(@Request() req) {
    return await this.authService.getAccountById(req.params.id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Request() req) {
    if (this.authService.compareUserId(req.paras.id, req.user.id))
      throw new UnauthorizedException("수정권한이 없습니다.");
    const updatedUser = await this.accountsService.updateAccount(req.body.email, req.body.password);
    return updatedUser;
  }
}
