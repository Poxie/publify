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
export type Follow = {
    // The user that is followed
    userId: string;
    // The user that is following
    followerId: string;
    // The date the user started following (in unix)
    createdAt: number;
}
export type Notification = {
    id: string;
    userId: string;
    authorid: string;
    type: string;
    content: string;
    createdAt: string;
    image: string | null;
    targetId?: string;
}