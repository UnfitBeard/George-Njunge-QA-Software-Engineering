import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";
import { Book } from "./Books";
import { Bookcopies } from "./BookCopies";

@Entity()
export class BorrowedBooks {
    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => Users, (user) => user.id, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user!: Users;

    @ManyToOne(() => Book, (book) => book.id, { nullable: false })
    @JoinColumn({name: "book_id"})
    book!: Book

    @ManyToOne(()=>Bookcopies, (copy)=> copy.copy_id, {nullable: false})
    @JoinColumn({name: "copy_id"})
    copy!: Bookcopies

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    borrowed_at!: Date; // Timestamp when the book was borrowed

    @Column({ type: "timestamp" })
    due_date!: Date; // When the book should be returned
}
