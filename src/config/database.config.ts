import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Cart } from 'src/cart/models/cart.model';
import { ItemOrder } from 'src/order/models/order-item.model';
import { Favorite } from 'src/favorite/models/favorite.model';
import { Order } from 'src/order/models/order.model';
import { Point } from 'src/point/models/point.models';
import { Image } from 'src/product/models/image.model';
import { Product } from 'src/product/models/product.model';
import { Token } from 'src/token/models/token.model';
import { ImageUser } from 'src/user/models/user-image.model';
import { User } from 'src/user/models/user.model';
import { DataSource } from 'typeorm';
import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_USER,
} from './config';

config();

export const configDatabase: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: DATABASE_PORT,
  entities: [
    User,
    Token,
    Product,
    Image,
    Favorite,
    Order,
    Point,
    ItemOrder,
    ImageUser,
    Cart,
  ],
  migrations: ['dist/migrations/*.js'],
};

export const source = new DataSource({
  ...configDatabase,
  type: 'postgres',
  entities: ['dist/**/*.model.js'],
  migrationsTableName: 'migrations',
});

