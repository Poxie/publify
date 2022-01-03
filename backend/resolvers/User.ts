import { posts } from "./Query";

export const User = {
    posts: (parent: any) => {
        const userId = parent.id;
        return posts.filter(post => post.authorId === userId);
    }
}