import { ApiProperty } from '@nestjs/swagger';
import { Cart } from 'src/cart/models/cart.model';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { ImageUser } from './user-image.model';

export enum PersonRole {
  User = 'user',
  Admin = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  surname: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  phone: string;

  @ApiProperty()
  @Column()
  address: string;

  @Column({ default: 'user' })
  role: PersonRole;

  @OneToOne(() => ImageUser, (image) => image.user)
  image: ImageUser;

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart;
}
