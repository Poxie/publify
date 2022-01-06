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
            content
            media {
                id
                url
            }
            author {
                displayName
                avatar
            }
            likes
            likeCount
        }
    `)
    return posts;
}


// Mutations

// Create like
export const createPostLike: (postId: string) => Promise<void> = async (postId) => {

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