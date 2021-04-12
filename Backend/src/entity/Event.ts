import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './User';
import { Trail } from './Trail';

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

  @Column()
  photoName!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => User)
  @JoinTable()
  user: User | undefined;

  @ManyToOne(() => Trail, (trail) => trail.events)
  trail: Trail | undefined;
}
