/*
  What: This is used to initialize the Review table in the HikEasy database
  Who: Wong Wing Yan 1155125194
  Where: backend database
  Why: to construct the table for storing photos
  How: use typeorm to connect to mysql database, and set up table for the reviews
*/
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

  //attribute of the Review
  @PrimaryGeneratedColumn()
  id!: number;

  //user can have multiple reviews
  @ManyToOne(() => User, (user) => user.reviews, { cascade: true })
  user!: User;

  //trail can have multiple reviews
  @ManyToOne(() => Trail, (trail) => trail.reviews, { cascade: true })
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
