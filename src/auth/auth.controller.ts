import { Body, Controller, Get, Post, Query, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Get('login')
  async test(@Request() req): Promise<any> {
    console.log(req.query);
    return await this.authService.login(req.query.email, req.query.password);
  }
}
