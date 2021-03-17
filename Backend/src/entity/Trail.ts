import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity()
export class Trail {

    @PrimaryGeneratedColumn()
    trailID!: number;

    @Column()
    difficulty!: number;

    @Column()
    trailName!: string;

    @Column()
    description!: string;

    @Column()
    isVerified!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt?: Date;
}
