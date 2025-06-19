import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import Jwt from 'src/modules/auth/utils/jwt';
import { SignUpHandler } from 'src/modules/auth/handlers/sign-up.handler';
import { AuthController } from 'src/modules/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SignInHandler } from 'src/modules/auth/handlers/sign-in.handler';
import RefreshTokenHandler from 'src/modules/auth/handlers/refresh-token.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [
    Jwt,
    SignUpHandler,
    SignInHandler,
    RefreshTokenHandler
  ],
})

export class AuthModule {}
