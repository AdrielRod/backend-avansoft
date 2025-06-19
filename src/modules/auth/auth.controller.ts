import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RefreshTokenDto } from 'src/modules/auth/dtos/refresh-token.dto';
import { SignInDto } from 'src/modules/auth/dtos/sign-in.dto';
import { SignUpDto } from 'src/modules/auth/dtos/sign-up.dto';
import RefreshTokenHandler from 'src/modules/auth/handlers/refresh-token.handler';
import { SignInHandler } from 'src/modules/auth/handlers/sign-in.handler';
import { SignUpHandler } from 'src/modules/auth/handlers/sign-up.handler';

@Controller('auth')
export class AuthController {
  constructor(
    private signUpHandler: SignUpHandler,
    private signInHandler: SignInHandler,
    private refreshTokenHandler: RefreshTokenHandler
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.signInHandler.execute(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    return await this.signUpHandler.execute(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.refreshTokenHandler.execute(refreshTokenDto);
  }
}
