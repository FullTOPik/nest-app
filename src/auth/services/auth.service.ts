import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from 'src/user/dto/user-registration.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserService } from 'src/user/services/user.service';
import { TokenService } from '../../token/services/token.servise';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { PayloadTokenDto } from 'src/token/dto/payload-token.dto';
import { SECRET } from 'src/config/config';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { DeleteResult } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
  ) { }

  async registration(
    userRegistrationDto: UserRegistrationDto,
  ): Promise<AuthResponseDto> {
    const email = await this.userService.findUserByEmail(
      userRegistrationDto.email,
    );
    if (email) {
      throw new BadRequestException('A user with this email already exists!');
    }

    const phone = await this.userService.findUserByPhone(
      userRegistrationDto.phone,
    );
    if (phone) {
      throw new BadRequestException('A user with this phone already exists!');
    }

    const hashPassword = await bcrypt.hash(userRegistrationDto.password, 4);
    const newUser = await this.userService.createUser({
      ...userRegistrationDto,
      password: hashPassword,
    });

    const user = new UserResponseDto(newUser);
    const tokens = this.tokenService.generateTokens(user);

    this.tokenService.saveTokens(tokens.refreshToken, user.id);

    return {
      ...tokens,
      user,
    };
  }

  async login(userLoginDto: UserLoginDto): Promise<AuthResponseDto> {
    const person = await this.userService.findUserByEmail(userLoginDto.email);
    if (!person) {
      throw new BadRequestException('Invalid email!');
    }

    const equalPasswords = await bcrypt.compare(
      userLoginDto.password,
      person.password,
    );
    if (!equalPasswords) {
      throw new BadRequestException('Invalid password!');
    }

    const user = new UserResponseDto(person);
    const tokens = this.tokenService.generateTokens(user);

    this.tokenService.saveTokens(tokens.refreshToken, user.id);

    return {
      ...tokens,
      user,
    };
  }

  async refresh(token: string): Promise<AuthResponseDto> {
    if (!token) {
      throw new BadRequestException('Unauthorized error');
    }

    this.tokenService.findTokenOrError(token);
    const payload = new PayloadTokenDto(token, SECRET.REFRESH);
    const { password, ...user } = await this.userService.findUserByIdOrError(payload.id);

    const tokens = this.tokenService.generateTokens(payload);
    this.tokenService.saveTokens(tokens.refreshToken, payload.id);

    return {
      ...tokens,
      user,
    };
  }

  logout(token: string): Promise<DeleteResult> {
    if (!token) {
      throw new BadRequestException('Unauthorized error');
    }
    return this.tokenService.removeToken(token);
  }
}

