import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.model';

@Entity('images_users')
export class ImageUser {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  userId: number;

  @Column()
  @ApiProperty()
  image: string;

  @OneToOne(() => User, (user) => user.image)
  user: User;
}

