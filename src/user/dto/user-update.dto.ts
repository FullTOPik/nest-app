import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name?: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  surname?: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  address?: string;
}

