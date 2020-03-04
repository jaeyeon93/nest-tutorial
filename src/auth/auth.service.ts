import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from '../account/accounts.service';
import {Account} from '../account/account.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ResponseDto } from '../dto/responseDto';
import { AccountsRepository } from '../account/accounts.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AccountsService))
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  // 실제 전달한 비밀번호와 DB에 있는 account에 있는 비밀번호를 서로 검증.
  async validateAccount(payload: JwtPayload): Promise<any> {
    const account: Account = await this.accountsService.findByEmail(payload.email);
    if (account && account.getPassword() == payload.password) {
      const {getPassword, ...result} = account;
      return result;
    }
    return null;
  }

  makeAccessToken(account: Account) {
    return this.jwtService.sign({'email': account.getEmail(), 'password': account.getPassword()});
  };

  // 이전에 검증들이 끝나면 email로 사용자를 구별하고 access_token을 발급. jwtService.sign이 사용자인증을 의미. 여기서 토큰생성한다.
  async login(email: string, password: string) {
    const payload = {email, password}
    return {
      email,
      // eslint-disable-next-line @typescript-eslint/camelcase
      accessToken: this.jwtService.sign(payload),
    }
  }
}
