import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserRegistrationDto extends OmitType(UserDto, [
  'role',
  'id',
] as const) {}

