import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Event } from './Event';
import { Review } from './Review';
import { Photo } from './Photo';

@Entity()
export class User {
  // note: for entity attributes we will use a ! after the name to assert that they are defined
  // so that TypeScript compiler does not complain about this

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firebaseId!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @Column({
    default: '',
  })
  email!: string;

  @Column({
    default: '',
  })
  password!: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[];

  @OneToMany(() => Event, (event) => event.user)
  events: Event[] | undefined;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos!: Photo[];
}
