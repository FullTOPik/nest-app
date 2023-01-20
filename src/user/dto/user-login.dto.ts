import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserLoginDto extends PickType(UserDto, [
  'password',
  'email',
] as const) {}

