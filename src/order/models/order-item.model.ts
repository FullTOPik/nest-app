import { Order } from 'src/order/models/order.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('order-item')
export class ItemOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  orderId: number;

  @Column()
  name: string;

  @Column()
  count: number;

  @Column()
  cost: number;

  @Column({ default: 0 })
  removed: number;

  @ManyToOne(() => Order, (order) => order.itemOrder)
  order: Order;
}
