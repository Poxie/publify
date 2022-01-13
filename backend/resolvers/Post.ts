import { getCommentsByParentId, getMediaByPostId, getUserById } from "../logic/db-actions";

export const Post = {
    author: async (parent: any) => {
        const authorId = parent.authorId;
        const user = await getUserById(authorId);
        return user;
    },
    media: async (parent: any) => {
        const parentId = parent.id;
        const media = await getMediaByPostId(parentId);
        return media;
    },
    comments: async (parent: any) => {
        const parentId = parent.id;
        const comments = await getCommentsByParentId(parentId);
        return comments;
    }
}