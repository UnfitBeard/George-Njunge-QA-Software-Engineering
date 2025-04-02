import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./Entities/Task.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "mysecretpassword",
  database: "to_do",
  synchronize: true,  // Auto-sync schema (only for development)
  logging: true,
  entities: [Task],  // Add entity classes here
  migrations: [],
  subscribers: [],
});

