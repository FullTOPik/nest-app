import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UserDto } from './user.dto';

export class UpdateUserPasswordDto extends PickType(UserDto, ['password']) {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  newPassword: string;
}

