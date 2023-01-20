import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { configDatabase } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { FileModule } from './file/file.module';
import { ProductModule } from './product/product.module';
import { FavoriteModule } from './favorite/favorite.module';
import { CartModule } from './cart/cart.module';
import { PointModule } from './point/point.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configDatabase),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule,
    AuthModule,
    FileModule,
    CartModule,
    TokenModule,
    PointModule,
    OrderModule,
    ProductModule,
    FavoriteModule,
  ],
  exports: [],
})
export class AppModule {}

