import {Test, TestingModule} from '@nestjs/testing';
import {AccountsService} from '../../src/account/accounts.service';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../../src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsRepository } from '../../src/account/accounts.repository';
import { AuthService } from '../../src/auth/auth.service';
import { AccountsController } from '../../src/account/accounts.controller';
import { AppModule } from '../../src/app.module';

describe('AccountService', () => {
  let accountsService: AccountsService;
  let accountsController: AccountsController;

  beforeEach(async (done) => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[forwardRef(() => AuthModule)],
      controllers: [AccountsController],
      providers:[AccountsService]
    }).compile();
    accountsService = await module.resolve(AccountsService);
    done();
  });

  test('should be defined', () => {
    expect(accountsService).toBeDefined();
  });
})
