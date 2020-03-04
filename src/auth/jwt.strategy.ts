import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload, uuid: string) {
    console.log(`uuid : ${uuid}`);
    console.log(`jwt.strategy에서 전달받은 payload ${JSON.stringify(payload)}`);
    const account = await this.authService.validateAccount(payload);
    console.log(`validateuser의 결과 ${JSON.stringify(account)}`);
    if (!account)
      throw new UnauthorizedException();
    return account;
  }
}
