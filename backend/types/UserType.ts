export type CustomAbout = {
    userId: string;
    emoji: string;
    label: string;
    value: string;
    type: string;
}
export type UserType = {
    id: string;
    username: string;
    email?: string;
    emailVerified?: boolean;
    displayName: string;
    avatar: string;
    color?: string;
    banner?: string;
    bio?: string;
    followersCount: number;
    postCount: number;
    location?: string;
    education?: string;
    relationship?: string;
    customAbouts?: CustomAbout[];
    emailNotifications?: boolean;
}