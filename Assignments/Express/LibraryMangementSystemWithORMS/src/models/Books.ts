import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Users } from "./User";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column({ type: "int" })
    publication_year!: number;

    @Column({ type: "boolean", default: true })
    available!: boolean; // If the book is available for borrowing

    @ManyToOne(() => Users, (user) => user.id, { nullable: true }) // Nullable in case no borrower
    @JoinColumn({ name: "borrowed_by" }) // Foreign key reference to Users table
    borrowedBy?: Users;
}