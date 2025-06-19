import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
class Jwt {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    
  ) {}

  generateTokens(user) {
  
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE,
    });

    const refreshToken = this.jwtService.sign(
      { email: payload.email },
      {
        secret: process.env.JWT_SECRET_REFRESH,
        expiresIn: process.env.JWT_EXPIRE_REFRESH,
      },
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async verifyRefreshToken({ refresh_token }) {
    if (!refresh_token) {
      throw new NotFoundException('Token not found');
    }

    const email = this.jwtService.decode(refresh_token)['email'];
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    try {
      this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_SECRET_REFRESH,
      });

      return user;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Inválid signature');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}

export default Jwt;
  