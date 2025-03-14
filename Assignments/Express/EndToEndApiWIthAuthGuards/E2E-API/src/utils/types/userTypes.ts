import { Request } from "express";

export interface User {
    id :string;
    name: string;
    email:string;
    password?:string;
    role_id: number;
}

export interface UserRequest extends Request {
    user?: User;
}