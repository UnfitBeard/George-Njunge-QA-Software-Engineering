import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm"
import { UserRoles } from "./UserRoles"

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
    
    @Column()
    created_at!:string

    @ManyToOne(() => UserRoles, (role) => role.users) // Many users -> One role
    @JoinColumn({ name: "role_id" }) // This creates a 'role_id' foreign key column in Users
    role!: UserRoles;
}
