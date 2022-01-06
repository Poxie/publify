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
}

export type Media = {
    id: string;
    url: string;
}



// Contexts
export type AuthContext = {
    user: UserType | null;
    login: (username: string, password: string) => Promise<void>;
}