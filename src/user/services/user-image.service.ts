import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageUserDto } from '../dto/user-image.dto';
import { ImageUser } from '../models/user-image.model';

@Injectable()
export class ImageUserService {
  constructor(
    @InjectRepository(ImageUser)
    private imageUserRepository: Repository<ImageUser>,
  ) {}

  async updateOrSave(imageUserDto: ImageUserDto): Promise<ImageUser> {
    const imageData = await this.imageUserRepository.findOne({
      where: { userId: imageUserDto.userId },
    });
    if (imageData) {
      imageData.image = imageUserDto.image;
      return this.imageUserRepository.save(imageData);
    }

    return this.imageUserRepository.save(imageUserDto);
  }
}
