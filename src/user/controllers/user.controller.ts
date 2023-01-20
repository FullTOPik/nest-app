import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppRequest } from 'src/common/dto/app-request.dto';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { UpdateUserPasswordDto } from '../dto/user-update-password.dto';
import { UpdateUserDto } from '../dto/user-update.dto';
import { ImageUser } from '../models/user-image.model';
import { PersonRole } from '../models/user.model';
import { RoleGuard } from '../../auth/role.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserService } from '../services/user.service';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage,
  })
  @ApiOperation({
    description: 'Update basic information about the user',
  })
  updateUser(
    @Req() appRequest: AppRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<InformationMessage> {
    return this.userService.updateUserInfo(appRequest.user.id, updateUserDto);
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: InformationMessage,
  })
  @ApiOperation({
    description: 'Update user password',
  })
  updatePassword(
    @Req() appRequest: AppRequest,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<InformationMessage> {
    return this.userService.updatePassword(
      appRequest.user.id,
      updateUserPasswordDto,
    );
  }

  @Patch('image')
  @Roles(PersonRole.User)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'update the user image',
    type: ImageUser,
  })
  @ApiOperation({
    description: 'update the user image',
  })
  update(
    @UploadedFile() image: Express.Multer.File,
    @Req() appRequest: AppRequest,
  ): Promise<ImageUser> {
    return this.userService.updateImage({ userId: appRequest.user.id }, image);
  }
}
