import { get } from "./methods"

// Getting user by ID
export const getUserById = async (id: string) => {
    const user = await get(`
        getUserById(id: "${id}") {
            name,
            avatar,
        }
    `)
    return user;
}


// Getting user avatar
export const getUserAvatar = (avatar: string) => {
    return avatar;
}