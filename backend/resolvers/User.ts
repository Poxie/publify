import { getPostsByAuthorId } from "../logic/db-actions";

export const User = {
    posts: async (parent: any) => {
        const userId = parent.id;
        const posts = await getPostsByAuthorId(userId);
        return posts;
    }
}