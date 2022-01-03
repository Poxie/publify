import { getUserById } from "../logic/db-actions";
import { users } from "./Query";

export const Post = {
    author: async (parent: any) => {
        const authorId = parent.authorId;
        const user = await getUserById(authorId);
        return user;
    }
}