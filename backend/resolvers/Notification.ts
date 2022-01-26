import { getUserById } from "../logic/db-actions";

export const Notification = {
    author: async (parent: any) => {
        const authorId = parent.authorId;
        const author = await getUserById(authorId);
        return author;
    }
}