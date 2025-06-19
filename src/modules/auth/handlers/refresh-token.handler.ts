import { Injectable } from '@nestjs/common';
import { RefreshTokenDto } from 'src/modules/auth/dtos/refresh-token.dto';
import Jwt from 'src/modules/auth/utils/jwt';

@Injectable()
class RefreshTokenHandler {
  constructor(private jwt: Jwt) {}

  async execute({ refresh_token }: RefreshTokenDto) {
    const user = await this.jwt.verifyRefreshToken({ refresh_token });
    return this.jwt.generateTokens(user);
  }
}

export default RefreshTokenHandler;
