import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { User } from './models/user.model';
import { UserController } from './controllers/user.controller';
import { FileModule } from 'src/file/file.module';
import { ImageUser } from './models/user-image.model';
import { ImageUserService } from './services/user-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ImageUser]), FileModule],
  providers: [UserService, ImageUserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
