import { Media } from "./Media";

export type Post = {
    id: string;
    authorId: string;
    content: string;
    media: Media[];
    likes: String[];
    isLiked: boolean;
    likeCount: number;
    createdAt: string;
    commentCount: number;
}