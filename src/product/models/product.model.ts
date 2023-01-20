import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/models/cart.model';
import { CategoryEnum } from '../enums/categoty.enum';
import { Image } from './image.model';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  category: CategoryEnum;

  @OneToMany(() => Image, (image) => image.product)
  image: Image[];

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];
}
