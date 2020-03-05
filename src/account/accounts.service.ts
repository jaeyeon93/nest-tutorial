import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { Account } from './account.entity';
import { AccountsRepository } from './accounts.repository';
import { ResponseDto } from '../dto/responseDto';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly accountsRepository: AccountsRepository
  ) {};

  async createAccount(accountDto: AccountDto): Promise<ResponseDto> {
    const hashingDto = await this.applyDtoHashing(accountDto);
    const account: Account = hashingDto.of();
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
    await this.accountsRepository.update(before.getId(), temp.of());
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

  // GET, DELETE, PUT을 할때 입력으로 들어온 UUID와 실제 JWT에 있는 UUID가 같은비 비교.
  compareUserId(inputId: string, originId: string): boolean {
    if (inputId != originId)
      return false;
    return true;
  }

  async login(email: string, password: string) {
    console.log(`accountService loginCalled ${email}, ${password}`);
    return await this.authService.login(email, password);
  }

  // input으로 들어온 DTO를 password hashing을 통해 다시 객체화
  async applyDtoHashing(accountDto: AccountDto): Promise<AccountDto> {
    const beforePassword: string = accountDto.getPassword();
    return new AccountDto(accountDto.getEmail(), await this.hashPassword(beforePassword))
  }

  // Database에 삽입하기전 password 암호화
  async hashPassword(password: string) {
    return await bcrypt.hash(password, process.env.salt);
  }

  // input으로 들어온 attemp password와 기존 Account가 가지고있는 password를 서로 비교.
  async comparePassword(attempt: string, account: Account): Promise<boolean> {
    return await bcrypt.compare(attempt, account.getPassword());
  }
}
