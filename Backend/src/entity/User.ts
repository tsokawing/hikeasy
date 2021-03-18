import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Event} from "./Event";

@Entity()
export class User {

    // note: for entity attributes we will use a ! after the name to assert that they are defined
    // so that TypeScript compiler does not complain about this

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    age!: number;

    @Column({
        default: "",
    })
    email!: string;

    @Column({
        default: "",
    })
    password!: string;

    @OneToMany(() => Event, event => event.user)
    events: Event[] | undefined;
    

}
