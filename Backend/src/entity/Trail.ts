import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Trail {

    @PrimaryGeneratedColumn()
    trailID!: number;

    @Column()
    name!: string;

    @Column()
    difficulty!: number;

    @Column({
        default: "",
    })
    description!: string;

    @Column({
        default: false
    })
    isVerified!: boolean;

    @Column({
        default: null
    })
    profilePic!: string;

    @Column({
        default: true
    })
    isShown!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
