import { connection } from "../server"
import { Post } from "../types/Post"
import { UserType } from "../types/UserType"
import mysql from 'mysql';

const escape = mysql.escape;

// Getting user by ID
export const getUserById: (id: string) => Promise<UserType> = async (id) => {
    id = escape(id);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}

// Getting post by ID
export const getPostById: (id: string) => Promise<Post> = async (id) => {
    id = escape(id);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}

// Getting posts by author ID
export const getPostsByAuthorId: (id: string) => Promise<Post[]> = async (authorId) => {
    authorId = escape(authorId);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE authorId = ${authorId}`, (error, result) => {
            if(error) return reject(error);

            resolve(result);
        })
    })
}


// Mutations
export const insertUser: (password: string, {}: UserType) => Promise<UserType> = async (password, { name, avatar, banner }) => {
    const id = escape(name);
    name = escape(name);
    avatar = escape(avatar);
    banner = escape(banner);
    password = escape(password);
    
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users (id, name, password, avatar, banner) VALUES (${id}, ${name}, ${password}, ${avatar}, ${banner})`, async (error, result) => {
            if(error) return reject(error);

            const user = await getUserById(name);
            resolve(user);
        })
    })
}