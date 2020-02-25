import { Controller, Get } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get()
  getAccountsById(): string {
    return 'GET /accounts method called';
  }

}
