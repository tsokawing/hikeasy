
/*
  What: This is used to initialize the Phtot table in the HikEasy database
  Who: Wong Wing Yan 1155125194
  Where: backend database
  Why: to construct the table for storing photos
  How: use typeorm to connect to mysql database, and set up table for the photos
*/
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Trail } from './Trail';
import { User } from './User';
import { Event } from './Event';

@Entity()
export class Photo {
  
  //attributes of the photo table
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: '',
  })
  fileName!: string;

  @CreateDateColumn()
  createdAt!: Date;
  
  //one user can post multiple photo
  @ManyToOne(() => User, (user) => user.photos)
  user!: User | undefined;
  
  //one trail can post multiple photo
  @ManyToOne(() => Trail, (trail) => trail.photos)
  trail!: Trail | undefined;

  //one event can post multiple photo
  @ManyToOne(() => Event, (event) => event.photos)
  event!: Event | undefined;
}
