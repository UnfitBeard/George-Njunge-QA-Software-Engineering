import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "../models/User"
import { UserRoles } from "../models/UserRoles"
import { Book } from "../models/Books"
import { Bookcopies } from "../models/BookCopies"
import { BorrowedBooks } from "../models/BorrowedBooks"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "librarymanagementsystem",
    synchronize: true,
    logging: false,
    entities: [Users, UserRoles, Book, Bookcopies,BorrowedBooks

    ],
    migrations: ["migration/*.ts"],
    subscribers: [],
})
