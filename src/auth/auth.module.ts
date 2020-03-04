import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { AccountsModule } from '../account/accounts.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '300s'},
    }),
    AccountsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthController, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
