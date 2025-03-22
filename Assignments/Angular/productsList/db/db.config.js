"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Task_js_1 = require("./Entities/Task.js");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "to_do",
    synchronize: true, // Auto-sync schema (only for development)
    logging: true,
    entities: [Task_js_1.Task], // Add entity classes here
    migrations: [],
    subscribers: [],
});
