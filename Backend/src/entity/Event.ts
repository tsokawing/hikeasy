import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { User } from './User';
import { Trail } from './Trail';
import { Photo } from './Photo';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    default: '',
  })
  name!: string;

  @Column({
    default: '',
  })
  description!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  time!: Date;

  @OneToOne(() => Photo, (photo) => photo.event)
  photo!: Photo;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => User)
  @JoinTable()
  user: User | undefined;

  @ManyToOne(() => Trail, (trail) => trail.events)
  trail: Trail | undefined;
}
