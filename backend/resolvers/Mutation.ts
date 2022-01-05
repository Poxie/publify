import { insertUser } from "../logic/db-actions";
import { DatabaseUser } from "../types/DatabaseUser";

export const Mutation = {
    register: async (parent: any, args: any) => {
        const { username, password, avatar, banner }: DatabaseUser = args;
        if(!username) return;
        
        // Inserting user
        const user = await insertUser(password, { id: username, name: username, avatar, banner });
        return user;
    }
}