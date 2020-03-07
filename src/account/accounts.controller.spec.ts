import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

describe('Accounts Controller', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [AccountsService]
    }).compile();
    accountsController = module.get<AccountsController>(AccountsController);
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(accountsController).toBeDefined();
  });

  // it('findAll', () => {
  //   const result = ['test'];
  //   jest.spyOn(accountsService, 'findAll').mockImplementation((temp) => temp);
  // });
});
