import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { AccountsRepository } from './accounts.repository';
import { ResponseDto } from '../dto/responseDto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  private readonly accountsRepository: AccountsRepository
  ) {};

  async createAccount(accountDto: AccountDto): Promise<ResponseDto> {
    const account: Account = accountDto.of();
    account.setAccessToken(await this.authService.makeAccessToken(account));
    return new ResponseDto(await this.accountsRepository.save(account));
  }

  async findAll(): Promise<Account[]> {
    console.log(`find all method called`);
    return await this.accountsRepository.find();
  }

  async findOne(id: string): Promise<Account> {
    console.log(`findOne method called ${id}`);
    return await this.accountsRepository.findOne(id);
  }

  async updateAccount(email: string, password: string): Promise<ResponseDto> {
    const before: Account = await this.findByEmail(email);
    const temp: AccountDto = before.of().update(email, password);
    await this.accountsRepository.update(temp.getId(), temp.of());
    return new ResponseDto(await this.findByEmail(email));
  }

  async remove(id: string): Promise<any> {
    console.log(`id : ${id} typeof id ${typeof id}`);
    await this.accountsRepository.delete(id);
    return {"message":"deleted"};
  }

  async findByEmail(email: string): Promise<Account> {
    return await this.accountsRepository.findOne({where: {email}});
  }

  // GET /accounts/:id를 하게되면 Token안에 있는 uuid와 parameter로 전달되는 id를 비교 검증해줘야한다.
  async getAccountById(inputId: string, originId: string) {
    if (!this.compareUserId(inputId, originId))
      throw new UnauthorizedException('유저가 다릅니다.');
    const account: Account = await this.accountsRepository.findOne(inputId);
    account.setAccessToken(this.authService.makeAccessToken(account));
    await this.accountsRepository.update(account.getId(), account);
    return new ResponseDto(account);
  }

  compareUserId(inputId: string, orginId: string): boolean {
    if (inputId != orginId)
      return false;
    return true;
  }

  async login(email: string, password: string) {
    return await this.authService.login(email, password);
  }
}
