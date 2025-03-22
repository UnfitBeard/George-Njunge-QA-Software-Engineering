import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm"
import { UserRoles } from "./UserRoles"
import { Book } from "./Books"

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({nullable: false})
    username!: string

    @Column()
    email!: string

    @Column()
    password!: string

    //creating a one-to-one relation
    @Column()
    role_id!: number
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) 
    created_at!: Date;

    @ManyToOne(() => UserRoles, (role) => role.users) // Many users -> One role
    @JoinColumn({ name: "role_id" }) // This creates a 'role_id' foreign key column in Users
    role!: UserRoles;

    @OneToMany(() => Book, (book) => book.createdBy)
    books!: Book[];
}
