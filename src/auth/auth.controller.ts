import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async crateToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get('login')
  async login(@Query('email') email, @Query('password') password): Promise<any> {
    console.log(`email ${email} password : ${password}`);
    return await this.authService.login(email, password);
  }
}
