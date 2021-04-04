import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Photo } from './Photo';
import { Review } from './Review';

@Entity()
export class Trail {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  difficulty!: number;

  @Column({
    default: '',
  })
  description!: string;

  @Column({
    default: false,
  })
  isVerified!: boolean;

  @Column({
    default: null,
  })
  profilePic!: string;

  @Column({
    default: true,
  })
  isShown!: boolean;

  @Column({
    default: '',
  })
  waypoints!: string;

  @OneToMany(() => Review, (review) => review.trail)
  reviews!: Review[];

  @OneToMany(() => Photo, (photo) => photo.trail)
  photos!: Photo[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
