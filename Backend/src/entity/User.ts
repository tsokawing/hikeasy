/*
  What: This is used to initialize the User table in the HikEasy database
  Who: Wong Wing Yan 1155125194
  Where: backend database
  Why: to construct the table for storing photos
  How: use typeorm to connect to mysql database, and set up table for the users
*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Event } from './Event';
import { Review } from './Review';
import { Chat } from './Chat';
import { Photo } from './Photo';

@Entity()
export class User {
  // attribute of the User table
  // note: for entity attributes we will use a ! after the name to assert that they are defined
  // so that TypeScript compiler does not complain about this

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firebaseId?: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @Column({
    default: '',
  })
  email?: string;

  @Column({
    default: '',
  })
  password?: string;
  
  //one user can post review
  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  //one user can create many events
  @ManyToMany(() => Event, (event) => event.participants)
  events!: Event[];

  //one user can post many photos
  @OneToMany(() => Photo, (photo) => photo.user)
  photos!: Photo[];

  //one user can have many chats
  @OneToMany(() => Chat, (chat) => chat.user)
  chats!: Chat[];
}
