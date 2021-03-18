import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
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

  @OneToMany(() => Review, (review) => review.trail)
  reviews!: Review[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
