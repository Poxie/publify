import { UserType } from "./UserType";

export interface DatabaseUser extends UserType {
    password: string;
    username?: string;
}