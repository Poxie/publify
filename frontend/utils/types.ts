export type UserType = {
    username: string;
    displayName: string;
    id: string;
    avatar: string;
    banner?: string;
    bio: string;
    color: string;
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
    authorId: string;
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
    replies?: Comment[];
    likes: string[];
    likeCount: number;
}


// Contexts
export type AuthContext = {
    user: UserType | null;
    login: (username: string, password: string) => Promise<UserType | undefined>;
    updateUser: (user: UserType) => void;
}