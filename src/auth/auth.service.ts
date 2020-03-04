import { Injectable } from '@nestjs/common';
import { AccountsService } from '../account/accounts.service';
import {Account} from '../account/account.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService
  ) {}

  // 실제 전달한 비밀번호와 DB에 있는 account에 있는 비밀번호를 서로 검증.
  async validateAccount(payload: JwtPayload): Promise<any> {
    console.log(`auth.service에서 validateAccount를 시도`);
    console.log(`payload ${JSON.stringify(payload)}`);
    const account: Account = await this.accountsService.findByEmail(payload.email);
    if (account && account.getPassword() == payload.password) {
      const {getPassword, ...result} = account;
      return result;
    }
    return null;
  }

  // 이전에 검증들이 끝나면 email로 사용자를 구별하고 access_token을 발급. jwtService.sign이 사용자인증을 의미. 여기서 토큰생성한다.
  async login(email: string, password: string) {
    console.log(`auth에서 login호출`);
    const payload = {email, password}
    return {
      email,
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    }
  }
}
