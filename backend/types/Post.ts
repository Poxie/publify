import { Media } from "./Media";

export type Post = {
    id: string;
    authorId: string;
    content: string;
    media: Media[];
    likes: String[];
    likeCount: number;
    createdAt: number;
}