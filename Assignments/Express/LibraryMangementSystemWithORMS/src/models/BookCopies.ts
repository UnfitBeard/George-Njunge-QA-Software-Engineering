import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Books";

export enum BookStatus {
    Borrowed = "Borrowed",
    Available = "Available"
}

export enum Condition {
    New = "New",
    Damaged = "Damaged"
}
@Entity()
export class Bookcopies {
    @PrimaryGeneratedColumn()
    copy_id!: number

    @ManyToOne(() => Book, (book) => book.copies, { onDelete:"CASCADE",nullable: false }) 
    @JoinColumn({ name: "book_id" }) 
    book!: Book; 

    @Column()
    inventory_number!: string

    @Column({
        type: "enum",
        enum: BookStatus,
        default: BookStatus.Available
    })
    status!: BookStatus

    @Column({
        type: "enum",
        enum: Condition,
        default: Condition.New
    })
    condition!: Condition

    @Column()
    location!: string
}