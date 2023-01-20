import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRegistrationDto } from '../dto/user-registration.dto';
import { UpdateUserDto } from '../dto/user-update.dto';
import { User } from '../models/user.model';
import { InformationMessage } from 'src/common/interfaces/information-message.interface';
import { UpdateUserPasswordDto } from '../dto/user-update-password.dto';
import { ImageUserRequestDto } from '../dto/user-image-request.dto';
import { ImageUser } from '../models/user-image.model';
import { FileService } from 'src/file/services/file.service';
import { ImageUserService } from './user-image.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private imageUserService: ImageUserService,
    private fileService: FileService,
  ) {}

  findUserByPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
    });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findUserByIdOrError(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  createUser(user: UserRegistrationDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async updateUserInfo(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<InformationMessage> {
    if (updateUserDto.email) {
      const userByEmail = await this.findUserByEmail(updateUserDto.email);

      if (userByEmail && userByEmail.id !== id) {
        throw new BadRequestException(
          `The user with the email ${updateUserDto.email} already exists`,
        );
      }
    }

    if (updateUserDto.phone) {
      const userByPhone = await this.findUserByPhone(updateUserDto.phone);

      if (userByPhone && userByPhone.id !== id) {
        throw new BadRequestException(
          `The user with the phone ${updateUserDto.phone} already exists`,
        );
      }
    }

    await this.userRepository.update({ id }, { ...updateUserDto });

    return { message: 'The data has been successfully changed' };
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<InformationMessage> {
    const userData = await this.findUserByIdOrError(id);
    const equalPassword = await bcrypt.compare(
      updateUserPasswordDto.password,
      userData.password,
    );

    if (!equalPassword) {
      throw new BadRequestException('Incorrect password entered');
    }

    const newPassword = await bcrypt.hash(updateUserPasswordDto.newPassword, 4);
    await this.userRepository.update({ id }, { password: newPassword });

    return { message: 'The password has been changed' };
  }

  async updateImage(
    imageUserRequestDto: ImageUserRequestDto,
    image: Express.Multer.File,
  ): Promise<ImageUser> {
    const imagePath = this.fileService.createFile(image);

    return this.imageUserService.updateOrSave({
      image: imagePath,
      ...imageUserRequestDto,
    });
  }
}
