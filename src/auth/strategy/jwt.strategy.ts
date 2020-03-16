import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { JwtPayload } from '../jwt-payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // controller에 @UseGuards(JwtAuthGuard) 붙은 메서드들은 여기를 사전에 거쳐서 검증을 한다.
  async validate(payload: JwtPayload) {
    const account = await this.authService.validateAccount(payload);
    if (!account)
      throw new UnauthorizedException();
    return account;
  }
}
