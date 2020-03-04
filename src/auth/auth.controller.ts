import { Body, Controller, Get, Post, Query, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async crateToken(): Promise<any> {
    return await this.authService.createToken();
  }

  // @UseGuards(LocalAuthGuard)
  // @Get('login')
  // async login(@Query('email') email, @Query('password') password): Promise<any> {
  //   console.log(`GET /auth/login email ${email} password : ${password}`);
  //   return await this.authService.login(email, password);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    console.log(req.user);
    return await this.authService.login(req.user.email, req.user.password);
  }

  @Post('test')
  async test(@Request() req): Promise<any> {
    console.log(req.body);
    return JSON.stringify(req.body);
  }
}
