export type UserType = {
    username: string;
    displayName: string;
    id: string;
    avatar?: string;
    banner?: string;
}

export type PostType = {
    content: string;
    id: string;
    author: UserType;
    media: Media[];
    likes: string[];
    likeCount: number;
    createdAt: string;
    commentCount: number;
    comments?: Comment[];
}

export type Media = {
    id: string;
    parentId: string;
    width: number;
    height: number;
    ratio: number;
}

export type Comment = {
    id: string;
    authorId: string;
    author?: UserType;
    content: string;
    parentId: string;
    parent?: PostType;
    createdAt: string;
}


// Contexts
export type AuthContext = {
    user: UserType | null;
    login: (username: string, password: string) => Promise<void>;
}