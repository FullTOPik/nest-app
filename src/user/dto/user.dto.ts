import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { PersonRole } from '../models/user.model';

export class UserDto {
  @ApiProperty({description: 'name user'})
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  surname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 25)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(PersonRole)
  role: PersonRole;

  constructor(dto: UserDto) {
    Object.assign(this, dto);
  }
}

