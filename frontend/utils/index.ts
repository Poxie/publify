import { request } from "./methods"
import { PostType } from "./types";

// Getting user by ID
export const getUserById = async (id: string) => {
    const user = await request(`
        getUserById(id: "${id}") {
            username
            displayName
            avatar
            banner
            id
        }
    `)
    return user;
}
// Getting posts by author ID
export const getPostsByAuthorId: (userId: string) => Promise<PostType[]> = async (userId) => {
    const posts = await request(`
        getPostsByAuthorId(id: "${userId}") {
            id
            content
            media {
                id
                url
            }
            author {
                displayName
                avatar
                id
                username
            }
            likes
            likeCount
            createdAt
            commentCount
        }
    `)
    return posts;
}


// Mutations

// Create like
export const createPostLike: (postId: string) => Promise<void> = async (postId) => {
    console.log('test');
    return await request(`
        createLike(postId: "${postId}") {
            content
        }
    `, 'mutation').then(console.log)
}
// Destroy like
export const destroyPostLike: (postId: string) => Promise<void> = async (postId) => {
    return await request(`
        destroyLike(postId: "${postId}") {
            content
        }
    `, 'mutation');
}
// Destroy post
export const destroyPost: (postId: string) => Promise<boolean> = async (postId) => {
    return await request(`
        destroyPost(postId: "${postId}")
    `, 'mutation');
}
// Publishing post
export const publishPost: (content: string) => Promise<PostType> = async (content) => {
    return await request(`
        createPost(content: "${content}") {
            id
            content
            author {
                avatar
                username
                displayName
                id
            }
            likes
            likeCount
            commentCount
            createdAt
            media {
                url
            }
        }
    `, 'mutation');
}

// Login
export const login = async (username: string, password: string) => {
    const response = await request(`
        login(username: "${username}", password: "${password}") {
            token
            user {
                username
                displayName
                avatar
            }
        }
    `)

    // Storing token in local storage
    localStorage.accessToken = response.token;

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