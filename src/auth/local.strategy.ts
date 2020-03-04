import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // @UseGuard에서('local')을 Strategy로 선택한 controller에 대해서 동작
  // 처음 request가 들어가면 request에 대한 검증을 한다.
  async validate(email: string, password: string): Promise<any> {
    const payload: JwtPayload = {email, password};
    const account = await this.authService.validateAccount(payload);
    if (!account)
      throw new UnauthorizedException('Fail to login try again');
    return account;
  }
}
