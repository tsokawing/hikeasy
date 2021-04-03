import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Trail } from './Trail';
import { User } from './User';

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
}
