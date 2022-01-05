import { connection } from "../server"
import { Post } from "../types/Post"
import { UserType } from "../types/UserType"
import mysql from 'mysql';
import { Media } from "../types/Media";

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

// Get media by post ID
export const getMediaByPostId: (postId: string) => Promise<Media[]> = async (postId) => {
    postId = escape(postId);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM media WHERE parentId = ${postId}`, (error, result) => {
            if(error) return reject(error);

            resolve(result);
        })
    })
}



// Generating user ID
export const generateUserId: () => Promise<string> = async () => {
    return new Promise(async (resolve, reject) => {
        // Creating a random ID
        let opts = '1234567890';
        let id = '';
        for(let i = 0; i < 18; i++) {
            id += opts[Math.floor(Math.random() * opts.length) - 1];
        }
        
        // Checking if ID already exists
        const user = await getUserById(id);
        if(user) return await generateUserId();

        // Else return ID
        return id;
    });
}
// Mutations
export const insertUser: (password: string, {}: UserType) => Promise<UserType> = async (password, { id, username, displayName, avatar, banner }) => {
    username = escape(username);
    displayName = escape(displayName);
    avatar = escape(avatar);
    banner = escape(banner);
    password = escape(password);
    
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users (id, username, password, displayName, avatar, banner) VALUES (${id}, ${username}, ${password}, ${displayName}, ${avatar}, ${banner})`, async (error, result) => {
            if(error) return reject(error);

            const user = await getUserById(id);
            resolve(user);
        })
    })
}