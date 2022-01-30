import { getFollowersCount, getPostCount, getPostsByAuthorId } from "../logic/db-actions";

export const User = {
    posts: async (parent: any) => {
        const userId = parent.id;
        const posts = await getPostsByAuthorId(userId);
        return posts;
    },
    followersCount: async (parent: any) => {
        const followersCount = await getFollowersCount(parent.id);
        return followersCount;
    },
    postCount: async (parent: any) => {
        const postCount = await getPostCount(parent.id);
        return postCount;
    }
}