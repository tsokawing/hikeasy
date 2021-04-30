/*
  What: This is used to initialize the Chat table in the HikEasy database
  Who: Tsang Tsz Kin Brian 1155126813
  Where: backend database
  Why: to construct the table for storing chats
  How: use typeorm to connect to mysql database, and set up table
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
import { Event } from './Event';
import { User } from './User';

@Entity()
export class Chat {
  /**
   * DO NOT TOUCH THIS.
   */
  @PrimaryGeneratedColumn()
  id!: number;

  //each chat have one user
  @ManyToOne(() => User, (user) => user.reviews, { cascade: true })
  user!: User;

  //each chat have one event
  @ManyToOne(() => Event, (event) => event.chats, { cascade: true })
  event!: Event;

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
