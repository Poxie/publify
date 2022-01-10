import { PostType, UserType } from "./types";
import { GraphQLClient } from 'graphql-request';
import { CREATE_LIKE, CREATE_POST, DESTROY_LIKE, DESTROY_POST } from "./mutations";
import { GET_ME, GET_POSTS_BY_AUTHOR_ID, GET_POST_BY_ID, GET_USER_BY_ID, LOGIN } from "./queries";
const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

// Getting access token
const getAccessToken = () => {
    if(typeof window === 'undefined') return;
    return window.localStorage.accessToken;
}

// Returning pure data from GraphQL response
const sanitizeData = (data: string, query: string) => {
    const rootQuery = query.split('{')[1].split('(')[0].trim();
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

// Getting user by ID
export const getUserById = async (id: string) => {
    const user = await request(GET_USER_BY_ID, { id });
    return user
}
// Getting posts by author ID
export const getPostsByAuthorId: (userId: string) => Promise<PostType[]> = async (userId) => {
    const posts = await request(GET_POSTS_BY_AUTHOR_ID, { id: userId });
    return posts;
}
// Getting post by post ID
export const getPostById: (postId: string) => Promise<PostType> = async (postId) => {
    const post = await request(GET_POST_BY_ID, { id: postId });
    return post;
}
// Create like
export const createPostLike: (postId: string) => Promise<void> = async (postId) => {
    const response = await request(CREATE_LIKE, { postId });
    return response;
}
// Destroy like
export const destroyPostLike: (postId: string) => Promise<void> = async (postId) => {
    const response = await request(DESTROY_LIKE, { postId });
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


// Getting user avatar
export const getUserAvatar = (avatar: string) => {
    return avatar;
}
// Getting user banner
export const getUserBanner = (banner: string) => {
    return banner;
}
// Getting post media URL
export const getMediaURL = (id: string) => {
    return `${process.env.NEXT_PUBLIC_IMAGE_ENDPOINT}/media/${id}.png`;
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