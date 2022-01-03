import { getPostById, getPostsByAuthorId, getUserById } from "../logic/db-actions";

export const Query = {
    getUserById: async (parent: any, args: any) => {
        const userId = args.id;
        const user = await getUserById(userId);
        return user;
    },
    getPostById: async (parent: any, args: any) => {
        const id = args.id;
        const post = await getPostById(id);
        return post;
    },
    getPostsByAuthorId: async (parent: any, args: any) => {
        const authorId = args.id;
        const posts = await getPostsByAuthorId(authorId);
        return posts;
    }
}