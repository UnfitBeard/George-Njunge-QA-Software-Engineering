import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "../models/User"
import { UserRoles } from "../models/UserRoles"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "librarymanagementsystem",
    synchronize: true,
    logging: false,
    entities: [Users, UserRoles],
    migrations: [],
    subscribers: [],
})
