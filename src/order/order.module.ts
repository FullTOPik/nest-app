import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { Order } from './models/order.model';
import { OrderService } from './services/order.service';
import { CartModule } from 'src/cart/cart.module';
import { ItemOrder } from './models/order-item.model';
import { ProductModule } from 'src/product/product.module';
import { OrderUserController } from './controllers/order-user.controller';
import { OrderAdminController } from './controllers/order-admin.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, ItemOrder]),
    CartModule,
    ProductModule,
  ],
  controllers: [OrderController, OrderUserController, OrderAdminController],
  providers: [OrderService],
})
export class OrderModule {}
