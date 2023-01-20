import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

export class PayloadAuthDto extends PickType(UserDto, ['email', 'id', 'role']) {}

