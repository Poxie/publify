import { connection } from "../server"
import { Post } from "../types/Post"
import { UserType } from "../types/UserType"

// Getting user by ID
export const getUserById: (id: string) => Promise<UserType> = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}

// Getting post by ID
export const getPostById: (id: string) => Promise<Post> = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}

// Getting posts by author ID
export const getPostsByAuthorId: (id: string) => Promise<Post[]> = async (authorId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE authorId = ${authorId}`, (error, result) => {
            if(error) return reject(error);

            resolve(result);
        })
    })
}