import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Photo, (photo) => photo.event)
  photos!: Photo[];

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Trail, (trail) => trail.events, { eager: true })
  trail: Trail | undefined;
}
