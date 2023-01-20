import { Module } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { CartController } from './controllers/cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './models/cart.model';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), ProductModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule { }
