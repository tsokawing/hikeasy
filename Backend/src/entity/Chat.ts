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
  
    @ManyToOne(() => User, (user) => user.reviews, { cascade: true })
    user!: User;
  
    @ManyToOne(() => Event, (event) => event.chats, { cascade: true })
    event!: Event;
     
    @Column()
    rating!: number;
  
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