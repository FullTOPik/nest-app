import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { SECRET } from 'src/config/config';
import { UserDto } from '../user/dto/user.dto';
import { Request } from 'express';
import { PayloadTokenDto } from 'src/token/dto/payload-token.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: SECRET.ACCESS,
    });
  }

  async validate(
    payload: UserDto,
  ): Promise<PayloadTokenDto> {
    return { id: payload.id, email: payload.email, role: payload.role };
  }
}

const cookieExtractor = function (req: Request): string {
  if (req && req.cookies) {
    return req.cookies.accessToken;
  }
};

