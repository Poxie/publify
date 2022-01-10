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
}

export type Media = {
    id: string;
    parentId: string;
    width: number;
    height: number;
    ratio: number;
}


// Contexts
export type AuthContext = {
    user: UserType | null;
    login: (username: string, password: string) => Promise<void>;
}