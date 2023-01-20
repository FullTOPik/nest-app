
import { ItemOrder } from 'src/order/models/order-item.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export enum OrderStatusEnum {
  Cancellation = 'cansel',
  Processing = 'process',
  Delivered = 'delivered',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  date: Date;

  @Column({ nullable: true })
  pointId: number;

  @Column({ default: OrderStatusEnum.Processing })
  status: OrderStatusEnum;

  @OneToMany(() => ItemOrder, (itemOrder) => itemOrder.order)
  itemOrder: ItemOrder[];
}
