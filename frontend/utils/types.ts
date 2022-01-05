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
}