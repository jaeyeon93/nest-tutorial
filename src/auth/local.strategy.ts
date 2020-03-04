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

  async validate(email: string, password: string): Promise<any> {
    console.log(`local-strategy에서 validate호출`);
    const payload: JwtPayload = {email, password};
    console.log(`payload : ${JSON.stringify(payload)}`);
    const account = await this.authService.validateAccount(payload);
    if (!account)
      throw new UnauthorizedException('local전략에서 막힘');
    return account;
  }
}
