import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Users } from "./User";

@Entity()
export class UserRoles {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    role_name!: string;

    @OneToMany(() => Users, (user) => user.role) // Define relationship
    users!: Users[]; // This is an array of Users with this role
}
