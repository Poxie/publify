export type CustomAbout = {
    userId: string;
    emoji: string;
    label: string;
    value: string;
    type: 'custom';
    id: string;
}
export type UserType = {
    username: string;
    displayName: string;
    id: string;
    avatar: string;
    banner?: string;
    bio: string;
    color: string;
    followersCount: number;
    isFollowing: boolean;
    postCount: number;
    location?: string;
    education?: string;
    relationship?: string;
    customAbouts?: CustomAbout[];
}

export type PostType = {
    content: string;
    id: string;
    author: UserType;
    media: Media[];
    likes: string[];
    likeCount: number;
    isLiked: boolean;
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

export type Notification = {
    id: string;
    userId: string;
    author: UserType;
    type: string;
    content: string;
    createdAt: string;
    image?: string;
    targetId?: string;
}


// Contexts
export type AuthContext = {
    user: UserType | null;
    login: (username: string, password: string) => Promise<UserType | undefined>;
    updateUser: (user: UserType) => void;
}