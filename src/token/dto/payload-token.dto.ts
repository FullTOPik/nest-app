import { PickType } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { PayloadAuthDto } from 'src/auth/dto/auth-payload.dto';
import { UserDto } from 'src/user/dto/user.dto';

export class PayloadTokenDto extends PickType(UserDto, ['email', 'id', 'role']) {
  constructor(token: string, secret: string) {
    const payload = jwt.verify(token, secret) as PayloadAuthDto;
    super();

    Object.assign(this, payload);
  }
}

