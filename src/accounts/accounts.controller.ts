import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get()
  getAccountsById(): string {
    return 'GET /accounts method called';
  }

  @Get(':id')
  findById(@Param() params): string {
    console.log(params.id);
    return `2This action returns a ${params.id}`;
  };

  @Post()
  createAccount(): string {
    console.log(`request : `);
    return `POST /accounts/`
  }

  @Put(':id')
  updateById(@Param() params): string {
    console.log(`updateById : ${params.id}`);
    return `PUT /accounts/${params.id}`;
  }

  @Delete(':id')
  deleteById(@Param() params): string {
    console.log(`Delete by id : ${params.id}`);
    return `DELETE /accounts/${params.id}`;
  }
}
