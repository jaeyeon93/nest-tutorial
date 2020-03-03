import { Controller, Request, Get, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   console.log(`POST auth/login request: ${JSON.stringify(req)}`);
  //   return this.authService.login(req.account);
  // }
  //
  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

}
