import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.model';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  productId: number;

  @Column({ unique: true })
  @ApiProperty()
  path: string;

  @ManyToOne(() => Product, (product) => product.image)
  product: Product;
}

