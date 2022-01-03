import { connection } from "../server"
import { Post } from "../types/Post"
import { UserType } from "../types/UserType"

export const getUserById: (id: string) => Promise<UserType> = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}

export const getPostById: (id: string) => Promise<Post> = async (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}