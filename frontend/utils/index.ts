import { CustomAbout, Notification, PostType, UserType } from "./types";
import { GraphQLClient } from 'graphql-request';
import { CREATE_CUSTOM_ABOUT, CREATE_COMMENT, CREATE_LIKE, CREATE_POST, CREATE_USER, DESTROY_COMMENT, DESTROY_CUSTOM_ABOUT, DESTROY_LIKE, DESTROY_POST, UPDATE_CUSTOM_ABOUT, UPDATE_PROFILE } from "./mutations";
import { CREATE_FOLLOW, DESTROY_FOLLOW, GET_COMMENTS_BY_PARENT_ID, GET_ME, GET_MEDIA_BY_AUTHOR_ID, GET_MY_NOTIFICATIONS, GET_MY_NOTIFICATION_COUNT, GET_POSTS_BY_AUTHOR_ID, GET_POST_BY_ID, GET_USER_BY_ID, GET_USER_BY_USERNAME, LOGIN } from "./queries";
import { API_ENDPOINT, IMAGE_ENDPOINT } from "./constants";

// Getting access token
const getAccessToken = () => {
    if(typeof window === 'undefined') return;
    return window.localStorage.accessToken;
}

// Returning pure data from GraphQL response
const sanitizeData = (data: string, query: string) => {
    const rootQuery = query.split('{')[1].split('(')[0].trim().replaceAll('}', '').trim();
    return data[rootQuery];
}

// Exporting GraphQL client
export const client = new GraphQLClient(API_ENDPOINT, { headers: {
    authorization: `Bearer ${getAccessToken()}`
} });

// Generic request function
const request: (query: string, variables?: Object) => Promise<any> = async (query, variables) => {
    // Making query to GraphQL
    const response = await client.request(query, variables);

    // Sanitizing data - returning pure data
    const data = sanitizeData(response, query);

    // Returning data
    return data
}

// Getting user by username 
export const getUserByUsername = async (username: string) => {
    const user = await request(GET_USER_BY_USERNAME, { username });
    return user;
}
// Getting user by ID
export const getUserById = async (id: string) => {
    const user = await request(GET_USER_BY_ID, { id });
    return user
}
// Getting media by author ID
export const getMediaByAuthorId = async (id: string) => {
    const media = await request(GET_MEDIA_BY_AUTHOR_ID, { id });
    return media;
}
// Getting posts by author ID
export const getPostsByAuthorId: (userId: string, startIndex?: number, endIndex?: number) => Promise<PostType[]> = async (userId, startIndex, endIndex ) => {
    const posts = await request(GET_POSTS_BY_AUTHOR_ID, { id: userId, startIndex, endIndex });
    return posts;
}
// Getting post by post ID
export const getPostById: (postId: string) => Promise<PostType> = async (postId) => {
    const post = await request(GET_POST_BY_ID, { id: postId });
    return post;
}
// Create like
export const createLike: (parentId: string) => Promise<any> = async (parentId) => {
    const response = await request(CREATE_LIKE, { parentId });
    return response;
}
// Destroy like
export const destroyLike: (parentId: string) => Promise<any> = async (parentId) => {
    const response = await request(DESTROY_LIKE, { parentId }).catch(error => {
        throw new Error(error);
    });
    return response
}
// Destroy post
export const destroyPost: (postId: string) => Promise<boolean> = async (postId) => {
    const response = await request(DESTROY_POST, { postId });
    return response
}
// Publishing post
export const publishPost: (content: string, media?: File[]) => Promise<PostType> = async (content, media) => {
    const response = await request(CREATE_POST, { content, media });
    return response
} 
// Getting comments by post ID
export const getCommentsByParentId: (parentId: string) => Promise<Comment[]> = async (parentId) => {
    const response = await request(GET_COMMENTS_BY_PARENT_ID, { parentId });
    return response;
}
// Creating comment
export const createComment: (parentId: string, content: string) => Promise<Comment> = async (parentId: string, content: string) => {
    const comment = await request(CREATE_COMMENT, { parentId, content });
    return comment;
}
// Destroying comment
export const destroyComment: (id: string) => Promise<boolean> = async (id) => {
    const response = await request(DESTROY_COMMENT, { id });
    return response;
}

// Updating profile
export const updateProfile: (user: UserType) => Promise<UserType> = async (user) => {
    const profile = await request(UPDATE_PROFILE, user);
    return profile
}

// Update custom about
type PartialCustomAbout = {
    id?: string;
    label: string;
    emoji: string;
    value: string;
};
export const updateCustomAbout: (about: PartialCustomAbout) => Promise<void> = async (about) => {
    await request(UPDATE_CUSTOM_ABOUT, about)
}
export const createCustomAbout: (about: PartialCustomAbout) => Promise<PartialCustomAbout> = async (about) => {
    const customAbout = await request(CREATE_CUSTOM_ABOUT, about);
    return customAbout;
}
export const destroyCustomAbout: (aboutId: string) => Promise<void> = async (aboutId) => {
    await request(DESTROY_CUSTOM_ABOUT, { id: aboutId });
    return;
}

// Register
export const createUser: (user: any) => Promise<UserType> = async (user) => {
    const createdUser = await request(CREATE_USER, user);
    return createdUser;
}
// Login
type LoginType = {
    user: UserType,
    token: string;
}
export const login: (username: string, password: string) => Promise<LoginType> = async (username, password) => {
    const response = await request(LOGIN, { username, password });

    // Storing token in local storage
    localStorage.accessToken = response.token;

    return response;
}
// Get logged in user (Get me)
export const getMe = async () => {
    const response = await request(GET_ME);
    return response;
}

// Follow stuff
export const destroyFollow = async (userId: string) => {
    const response = await request(DESTROY_FOLLOW, { userId });
    return response;
}
export const createFollow = async (userId: string) => {
    const response = await request(CREATE_FOLLOW, { userId });
    return response;
}

// Notification stuff
export const getMyNotificationCount = async () => {
    const response = await request(GET_MY_NOTIFICATION_COUNT);
    return response;
}
export const getMyNotifications: () => Promise<Notification[]> = async () => {
    const response = await request(GET_MY_NOTIFICATIONS);
    return response;
}


// Getting user avatar
export const getUserAvatar = (avatar: string) => {
    if(!avatar) return;
    if(avatar.startsWith('blob')) return avatar;
    return `${IMAGE_ENDPOINT}/avatars/${avatar}.png`;
}
// Getting user banner
export const getUserBanner = (banner: string) => {
    if(!banner) return;
    if(banner.startsWith('blob')) return banner;
    return `${IMAGE_ENDPOINT}/banners/${banner}.png`;
}
// Getting post media URL
export const getMediaURL = (id: string) => {
    return `${IMAGE_ENDPOINT}/media/${id}.png`;
}
// Getting svg URL
export const getEmojiURL = (id: string) => {
    return `${IMAGE_ENDPOINT}/assets/emojis/${id}.svg`;
}

// First letter uppercase
export const getFirstLetterUppercase = (text: string) => {
    if(!text) return text;
    return text.slice(0,1).toUpperCase() + text.slice(1);
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// Getting readable time from unix
export const getReadableTimeFromUnix = (timestamp: string | number) => {
    if(typeof timestamp === 'string') {
        timestamp = parseInt(timestamp);
    }
    const date = new Date(timestamp);
    const today = new Date();
    const todayYear = today.getFullYear();

    const monthId = date.getMonth();
    const dateId = date.getDate();
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    let time = `${months[monthId]} ${dateId} at ${hours}:${minutes}`
    if(year !== todayYear) {
        time = `${months[monthId]} ${dateId}, ${year} at ${hours}:${minutes}`
    }

    return time;
}

// Determining language name by locale
// Make this better somehow later
export const getLanguageNameByLocale = (locale: string) => {
    switch(locale) {
        case 'se':
            return 'Svenska';
            break;
        case 'en':
            return 'English';
            break;
    }
}