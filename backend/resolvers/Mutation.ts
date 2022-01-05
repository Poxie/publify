import { generateUserId, insertUser } from "../logic/db-actions";
import { DatabaseUser } from "../types/DatabaseUser";

export const Mutation = {
    register: async (parent: any, args: any) => {
        const { username, displayName, password, avatar, banner }: DatabaseUser = args;
        
        // Generating user ID
        const id = await generateUserId();

        // Inserting user
        const user = await insertUser(password, { id, username, displayName, avatar, banner });
        return user;
    }
}