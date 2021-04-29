/*
  What: This is used to initialize the Trail table in the HikEasy database
  Who: Wong Wing Yan 1155125194
  Where: backend database
  Why: to construct the table for storing photos
  How: use typeorm to connect to mysql database, and set up table for the trails
*/

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Event } from './Event';
import { Photo } from './Photo';
import { Review } from './Review';

@Entity()
export class Trail {
  //attribute of Trail
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
    default: null,
  })
  length!: number;

  @Column({
    default: null,
  })
  city!: string;

  @Column({
    default: '',
  })
  waypoints!: string;
  
  //one trail can have multiple reviews
  @OneToMany(() => Review, (review) => review.trail)
  reviews!: Review[];
  
  //one trail can have multiple photos
  @OneToMany(() => Photo, (photo) => photo.trail)
  photos!: Photo[];

  @OneToMany(() => Event, (event) => event.trail)
  events!: Event[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // not to be inserted into the db
  displayCenter?: Array<number>;
}
