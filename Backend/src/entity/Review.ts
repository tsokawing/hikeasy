import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Trail } from './Trail';
import { User } from './User';

@Entity()
export class Review {
  /**
   * DO NOT TOUCH THIS.
   */
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id, { cascade: true })
  user!: User;

  @ManyToOne(() => Trail, (trail) => trail.id, { cascade: true })
  trail!: Trail;

  @Column()
  rating!: number;

  @Column({
    default: '',
  })
  comment!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
