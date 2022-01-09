import mysql from 'mysql';
import { createWriteStream } from 'fs';
import path from 'path';
import { connection } from "../server"
import { Post } from "../types/Post"
import { UserType } from "../types/UserType"
import { Media } from "../types/Media";
import { DatabaseUser } from "../types/DatabaseUser";
import { Comment, Like } from "../types";

const escape = mysql.escape;

// Getting user by ID
export const getUserById: (id: string) => Promise<DatabaseUser> = async (id) => {
    id = escape(id);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}
// Getting user by username
export const getUserByUsername: (username: string) => Promise<DatabaseUser | undefined> = async (username) => {
    username = escape(username);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM users WHERE username = ${username}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}

// Getting post by ID
export const getPostById: (id: string) => Promise<Post> = async (id) => {
    id = escape(id);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE id = ${id}`, async (error, result) => {
            if(error) return reject(error);

            // Fetching post likes
            if(result[0]) {
                // Make this more efficient later
                result[0].likes = await getLikesByPostId(id);
                result[0].likeCount = result[0].likes.length
                result[0].commentCount = await getCommentCountByPostId(result[0].id);
            }

            resolve(result[0]);
        })
    })
}

// Getting posts by author ID
export const getPostsByAuthorId: (id: string) => Promise<Post[]> = async (authorId) => {
    authorId = escape(authorId);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM posts WHERE authorId = ${authorId} ORDER BY createdAt DESC`, (error, result) => {
            if(error) return reject(error);
            
            // If no posts found, resolve
            if(!result.length) return resolve(result);

            // Fetching likes for posts
            let fetched: Post[] = [];
            result.forEach(async (post: Post) => {
                // Make this more efficient later
                post.likes = await getLikesByPostId(post.id);
                post.likeCount = post.likes.length;
                
                // Fetching comment count
                post.commentCount = await getCommentCountByPostId(post.id);

                // Pushing updated post to fetched array
                fetched.push(post);

                // Once all likes are fetched, resolve
                if(fetched.length === result.length) {
                    resolve(fetched);
                }
            });
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

// Get likes by post ID
export const getLikesByPostId: (postId: string) => Promise<String[]> = async (postId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM likes WHERE postId = ${postId}`, (error, result: Like[]) => {
            if(error) return reject(error);

            const likeUserIds = result.map(like => like.userId);
            resolve(likeUserIds);
        })
    })
}


// Generating random ID
const randomId = () => {
    let opts = '1234567890';
    let id = '';
    for(let i = 0; i < 18; i++) {
        id += opts[Math.floor(Math.random() * opts.length)];
    }
    return id;
}

// Generating user ID
export const generateUserId: () => Promise<string> = async () => {
    return new Promise(async (resolve, reject) => {
        // Creating a random ID
        const id = randomId();
        
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

// Creating post like
export const createtPostLike: (postId: string, userId: string) => Promise<void> = async (postId, userId) => {
    postId = escape(postId);
    userId = escape(userId);

    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO likes (userId, postId) VALUES (${userId}, ${postId})`, (error, result) => {
            if(error) return reject(error);
            resolve();
        })
    })
}

// Destroying post like
export const destroyPostLike: (postId: string, userId: string) => Promise<void> = async (postId, userId) => {
    postId = escape(postId);
    userId = escape(userId);

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM likes WHERE postId = ${postId} AND userId = ${userId}`, (error, result) => {
            if(error) return reject(error);
            resolve();
        })
    })
}

// Destroying post
export const destroyPost: (postId: string) => Promise<boolean> = async (postId) => {
    postId = escape(postId);

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM posts WHERE id = ${postId}`, (error, result) => {
            if(error) return reject(error);

            resolve(true);
        })
    })
}

// Generating post ID
const generatePostId: () => Promise<string> = async () => {
    // Generating random ID
    const id = randomId();

    // Checking if ID already exists
    const post = await getPostById(id);
    if(post) return await generatePostId();

    // Else return
    return id;
}
// Creating post
export const createPost: (authorId: string, content: string) => Promise<Post> = async (authorId, content) => {
    content = escape(content);
    authorId = escape(authorId);
    const id = await generatePostId();
    const escapedId = escape(id);
    const createdAt = escape(Date.now());

    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO posts (id, authorId, content, createdAt) VALUES (${escapedId}, ${authorId}, ${content}, ${createdAt})`, async (error, result) => {
            if(error) return reject(error);
            
            const post = await getPostById(id);
            resolve(post);
        })
    })
}
// Getting comment by ID
export const getCommentById: (commentId: string) => Promise<Comment> = async (commentId) => {
    commentId = escape(commentId);

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM comments WHERE id = ${commentId}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}
// Generating post ID
const generateCommentId: () => Promise<string> = async () => {
    // Generating random ID
    const id = randomId();

    // Checking if ID is in use
    const comment = await getCommentById(id);
    if(comment) return await generateCommentId();

    // Else return generated ID
    return id;
}
// Creating post comment
export const createComment: (postId: string, authorId: string, content: string) => Promise<Comment> = async (postId, authorId, content) => {
    postId = escape(postId)
    authorId = escape(authorId)
    content = escape(content);
    const createdAt = escape(Date.now());
    const id = await generateCommentId();
    const escapedId = escape(id);

    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO comments (id, parentId, authorId, content, createdAt) VALUES (${escapedId}, ${postId}, ${authorId}, ${content}, ${createdAt})`, async (error, result) => {
            if(error) return reject(error);

            const comment = await getCommentById(id);
            resolve(comment);
        })
    })
}
// Destroying post comment
export const destroyComment: (commentId: string) => Promise<void> = async (commentId) => {
    commentId = escape(commentId);

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM comments WHERE id = ${commentId}`, (error, result) => {
            if(error) return reject(error);

            resolve();
        })
    })
}
// Getting post comments
export const getCommentsByPostId: (postId: string) => Promise<Comment[]> = async (postId) => {
    postId = escape(postId);

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM comments WHERE parentId = ${postId}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}
// Getting post comment count
export const getCommentCountByPostId: (postId: string) => Promise<number> = async (postId) => {
    postId = escape(postId);

    return new Promise((resolve, reject) => {
        connection.query(`SELECT count(*) AS commentCount FROM comments WHERE parentId = ${postId}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]?.commentCount);
        })
    })
}
// Getting media by ID
export const getMediaById: (id: string) => Promise<Media> = (id) => {
    id = escape(id);

    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM media WHERE id = ${id}`, (error, result) => {
            if(error) return reject(error);

            resolve(result[0]);
        })
    })
}
// Generating media ID
export const generateMediaId: () => Promise<string> = async () => {
    // Generating random ID
    const id = randomId();

    // Checking if media exists
    const media = await getMediaById(id);
    if(media) return await generateMediaId();

    return id;
}
// Creating media
export const createMedia: (parentId: string, media: any) => Promise<Media[]> = async (parentId, media) => {
    parentId = escape(parentId);
    return new Promise(async (resolve, reject) => {
        const createdMedia: Media[] = [];
        
        for(const mediaItem of media) {
            const { createReadStream } = await mediaItem;
            const id = await generateMediaId();

            // Inserting media into media folder
            await new Promise(res =>
                createReadStream()
                    .pipe(createWriteStream(path.join(__dirname, '../imgs/media', `${id}.png`)))
                    .on('close', res)
            );

            // Inserting media into database
            connection.query(`INSERT INTO media (id, parentId) VALUES (${escape(id)}, ${parentId})`, async (error, result) => {
                if(error) return reject(error);      
                
                const newMedia = await getMediaById(id);
                createdMedia.push(newMedia);
                
                if(createdMedia.length === media.length) {
                    resolve(createdMedia);
                }
            })
        }
    })
}