import { CreateDateColumn, Entity, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Users } from "./User";
import { Bookcopies } from "./BookCopies";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    author!: string;

    @Column()
    genre!: string;

    @Column()
    publisher!: string;

    @Column({ type: "int" })
    publication_year!: number;

    @Column({ type: "int" })
    pages!: number;

    @Column()
    image_url!: string

    @Column()
    description!: string;

    @Column({default: 1})
    quantity!: number

    @ManyToOne(() => Users, (user) => user.id, { nullable: true }) // Nullable in case no borrower
    @JoinColumn({ name: "created_by" }) // Foreign key reference to Users table
    createdBy?: Users;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) 
    created_at!: Date;

    @OneToMany(() => Bookcopies, (bookCopy) => bookCopy.book) 
    copies!: Bookcopies[]

}