import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Token } from '../models/token.model';
import {
  JWT_LIFETIME_ACCESS,
  JWT_LIFETIME_REFRESH,
  SECRET,
} from 'src/config/config';
import { PayloadAuthDto } from 'src/auth/dto/auth-payload.dto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async saveTokens(token: string, userId: number): Promise<Token> {
    if (!token) {
      throw new BadRequestException('Token saving error');
    }
    const tokenData = await this.tokenRepository.findOne({
      where: { userId },
    });

    if (tokenData) {
      tokenData.token = token;
      return this.tokenRepository.save(tokenData);
    }
    this.tokenRepository.save({ userId, token });
  }

  generateTokens(user: PayloadAuthDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { id: user.id, email: user.email, role: user.role };

    return {
      accessToken: jwt.sign(payload, SECRET.ACCESS, {
        expiresIn: JWT_LIFETIME_ACCESS,
      }),
      refreshToken: jwt.sign(payload, SECRET.REFRESH, {
        expiresIn: JWT_LIFETIME_REFRESH,
      }),
    };
  }

  findToken(token: string): Promise<Token> {
    return this.tokenRepository.findOne({
      where: { token },
    });
  }

  findTokenOrError(token: string): Promise<Token> {
    return this.tokenRepository.findOneByOrFail({
      token,
    });
  }

  removeToken(token: string): Promise<DeleteResult> {
    return this.tokenRepository.delete({ token });
  }
}

