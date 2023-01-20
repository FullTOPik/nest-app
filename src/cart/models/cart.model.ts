import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/models/product.model';
import { User } from 'src/user/models/user.model';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('carts')
export class Cart {
  @ApiProperty({default: 1})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({default: 1})
  @Column()
  userId: number;

  @ApiProperty({default: 1})
  @Column()
  productId: number;

  @ApiProperty({default: 1})
  @Column({ default: 1 })
  count: number;

  @ManyToOne(() => Product, (product) => product.cart)
  product: Product;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;
}
