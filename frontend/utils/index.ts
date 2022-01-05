import { get } from "./methods"

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


// Getting user avatar
export const getUserAvatar = (avatar: string) => {
    return avatar;
}
// Getting user banner
export const getUserBanner = (banner: string) => {
    return banner;
}