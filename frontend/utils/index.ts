import { get } from "./methods"
import { PostType } from "./types";

// Getting user by ID
export const getUserById = async (id: string) => {
    const user = await get(`
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
    const posts = await get(`
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
        }
    `)
    return posts;
}


// Getting user avatar
export const getUserAvatar = (avatar: string) => {
    return avatar;
}
// Getting user banner
export const getUserBanner = (banner: string) => {
    return banner;
}