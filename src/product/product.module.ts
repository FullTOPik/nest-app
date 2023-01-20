import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ImageService } from './services/image.servise';
import { Product } from './models/product.model';
import { Image } from './models/image.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Image]), 
    UserModule,
    FileModule
  ],
  providers: [
    ProductService, 
    ImageService
  ],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}

