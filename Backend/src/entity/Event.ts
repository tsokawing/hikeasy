import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import {User} from "./User";

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
    
    @CreateDateColumn()
    createdAt!: Date;
    
    @ManyToOne(() => User, user => user.events)
    user: User | undefined;
    
}