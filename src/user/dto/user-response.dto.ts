import { OmitType } from '@nestjs/swagger';
import { User } from '../models/user.model';
import { UserDto } from './user.dto';

export class UserResponseDto extends OmitType(UserDto, ['password']) {
  constructor({ password, ...dto }: User) {
    super(dto);
    Object.assign(this, dto);
  }
}

