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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: '',
  })
  fileName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user!: User | undefined;

  @ManyToOne(() => Trail, (trail) => trail.photos)
  trail!: Trail | undefined;

  @ManyToOne(() => Event, (event) => event.photos)
  event!: Event | undefined;
}
