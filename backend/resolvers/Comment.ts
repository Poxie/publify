import { getCommentsByParentId, getPostById, getUserById } from "../logic/db-actions";

export const Comment = {
    author: async (parent: any) => {
        const authorId = parent.authorId;
        const author = await getUserById(authorId);
        return author;
    },
    parent: async (parent: any) => {
        const parentId = parent.parentId;
        const post = await getPostById(parentId);
        return post;
    },
    replies: async (parent: any) => {
        const parentId = parent.id;
        const replies = await getCommentsByParentId(parentId)
        return replies;
    }
}