import { Post } from "./Post"
import { UserType } from "./UserType"

export type Like = {
    postId: string;
    userId: string;
}
export type Comment = {
    id: string;
    authorId: string;
    author: UserType;
    content: string;
    parentId: string;
    parent: Post;
    createdAt: string;
    likes: string[];
    likeCount: number;
}