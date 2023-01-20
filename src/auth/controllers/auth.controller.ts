import {
  Controller,
  Body,
  Post,
  Res,
  Get,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { optionsAccess, optionsRefresh } from '../constants/auth.constants';
import { UserLoginDto } from '../../user/dto/user-login.dto';
import { UserRegistrationDto } from '../../user/dto/user-registration.dto';
import { AuthService } from '../services/auth.service';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppRequest } from 'src/common/dto/app-request.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  @ApiBody({ type: UserRegistrationDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({ description: 'Register a user' })
  async registration(
    @Body() userRegistrationDto: UserRegistrationDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const result = await this.authService.registration(userRegistrationDto);

    response.cookie('accessToken', result.accessToken, optionsAccess);
    response.cookie('refreshToken', result.refreshToken, optionsRefresh);
  }

  @Post('login')
  @ApiBody({ type: UserLoginDto })
  @ApiResponse({ status: HttpStatus.CREATED })
  @ApiOperation({
    description:
      'Allows the user to log in to the account by writing tokens to the cookie',
  })
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const result = await this.authService.login(userLoginDto);

    response.cookie('accessToken', result.accessToken, optionsAccess);
    response.cookie('refreshToken', result.refreshToken, optionsRefresh);
  }

  @Get('refresh')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ description: 'Refresh authorized user tokens' })
  async refresh(
    @Req() appRequest: AppRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const result = await this.authService.refresh(
      appRequest.cookies.refreshToken,
    );

    response.cookie('accessToken', result.accessToken, optionsAccess);
    response.cookie('refreshToken', result.refreshToken, optionsRefresh);
  }

  @Get('logout')
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage,
  })
  @ApiOperation({ description: 'Sign out of your account' })
  logout(
    @Req() appRequest: AppRequest,
    @Res({ passthrough: true }) response: Response,
  ): InformationMessage {
    this.authService.logout(appRequest.cookies.refreshToken);

    response.cookie('accessToken', '', { maxAge: -1 });
    response.cookie('refreshToken', '', { maxAge: -1 });

    return { message: 'You logged out of your account' };
  }

  //I really need the frontend, I don't know why
  @Get('checkout')
  @UseGuards(JwtAuthGuard)
  checkout(): boolean {
    return true;
  }
}
