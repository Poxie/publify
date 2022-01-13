import mysql from 'mysql';
import { createWriteStream } from 'fs';
import path from 'path';
import { connection } from "../server"
import { Post as PostType } from "../types/Post"
import { UserType } from "../types/UserType"
import { Media as MediaType } from "../types/Media";
import { DatabaseUser } from "../types/DatabaseUser";
import { Comment as CommentType, Like as LikeType } from "../types";
import { 
    DELETE_COMMENT,
    DELETE_LIKE, 
    DELETE_POST, 
    INSERT_COMMENT, 
    INSERT_LIKE, 
    INSERT_MEDIA, 
    INSERT_POST, 
    INSERT_USER, 
    SELECT_COMMENTS_BY_PARENT_ID, 
    SELECT_COMMENT_BY_ID, 
    SELECT_COMMENT_COUNT_BY_PARENT_ID, 
    SELECT_LIKES_BT_PARENT_ID, 
    SELECT_MEDIA_BY_ID, 
    SELECT_MEDIA_BY_POST_ID, 
    SELECT_POSTS_BY_AUTHOR_ID, 
    SELECT_POST_BY_ID, 
    SELECT_USER_BY_ID, 
    SELECT_USER_BY_USERNAME 
} from './queries';
import { RowDataPacket } from 'mysql2';
import imageSize from 'image-size';
import { promisify } from 'util';
const sizeOf = promisify(imageSize);

// MySQL data return types
type User = DatabaseUser & RowDataPacket;
type Post = PostType & RowDataPacket;
type Media = MediaType & RowDataPacket;
type Like = LikeType & RowDataPacket;
type Comment = CommentType & RowDataPacket;

// Getting user by ID
export const getUserById: (id: string) => Promise<DatabaseUser> = async (id) => {
    const [rows] = await connection.promise().query<User[]>(SELECT_USER_BY_ID, [id]);
    return rows[0];
}
// Getting user by username
export const getUserByUsername: (username: string) => Promise<DatabaseUser | undefined> = async (username) => {
    const [rows] = await connection.promise().query<User[]>(SELECT_USER_BY_USERNAME, [username])
    return rows[0];
}

// Getting post by ID
export const getPostById: (id: string) => Promise<Post> = async (id) => {
    const [rows] = await connection.promise().query<Post[]>(SELECT_POST_BY_ID, [id]);
    const post = rows[0];
    if(!post) return post;

    // Fetching likes
    post.likes = await getLikesByParentId(id);
    post.likeCount = post.likes.length;

    // Fetching comments
    post.commentCount = await getCommentCountByPostId(id);

    // Fetching media
    post.media = await getMediaByPostId(id);

    // Returning post
    return post;
}

// Getting posts by author ID
export const getPostsByAuthorId: (id: string, startIndex?: number, endIndex?: number) => Promise<Post[]> = async (authorId, startIndex=0, endIndex=3) => {
    const [posts] = await connection.promise().query<Post[]>(SELECT_POSTS_BY_AUTHOR_ID, [authorId, startIndex, endIndex])
    
    // If no posts found, return empty array
    if(!posts.length) return [];

    // Fetching extra properties
    for(const post of posts) {
        // Fetch likes
        post.likes = await getLikesByParentId(post.id);
        post.likeCount = post.likes.length;

        // Fetch comments
        post.commentCount = await getCommentCountByPostId(post.id);

        // Fetching media
        post.media = await getMediaByPostId(post.id);
    }

    // Return posts
    return posts;
}

// Get media by post ID
export const getMediaByPostId: (postId: string) => Promise<Media[]> = async (postId) => {
    const [media] = await connection.promise().query<Media[]>(SELECT_MEDIA_BY_POST_ID, [postId]);
    return media;
}

// Get likes by parent ID
export const getLikesByParentId: (parentId: string) => Promise<String[]> = async (parentId) => {
    const [likes] = await connection.promise().query<Like[]>(SELECT_LIKES_BT_PARENT_ID, [parentId]);
    const likeUserIds = likes.map(like => like.userId);
    return likeUserIds;
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

// Inserting user
export const insertUser: (password: string, {}: UserType) => Promise<UserType> = async (password, { id, username, displayName, avatar, banner }) => {
    // Insert user
    const [rows] = await connection.promise().query(INSERT_USER, [id, username, password, displayName, avatar, banner]);

    // Returning user
    const user = await getUserById(id);
    return user;
}

// Creating post like
export const createtPostLike: (postId: string, userId: string) => Promise<void> = async (postId, userId) => {
    await connection.promise().query(INSERT_LIKE, [userId, postId]);
    return;
}

// Destroying post like
export const destroyPostLike: (postId: string, userId: string) => Promise<void> = async (postId, userId) => {
    await connection.promise().query(DELETE_LIKE, [postId, userId]);
    return;
}

// Destroying post
export const destroyPost: (postId: string) => Promise<boolean> = async (postId) => {
    await connection.promise().query(DELETE_POST, [postId]);
    return true;
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
    const id = await generatePostId();
    const createdAt = Date.now();

    // Inserting post
    await connection.promise().query(INSERT_POST, [id, authorId, content, createdAt]);
    
    // Getting created post
    const post = await getPostById(id);

    // Returning post
    return post;
}
// Getting comment by ID
export const getCommentById: (commentId: string) => Promise<Comment> = async (commentId) => {
    const [rows] = await connection.promise().query<Comment[]>(SELECT_COMMENT_BY_ID, [commentId]);
    return rows[0];
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
    const createdAt = Date.now();
    const id = await generateCommentId();

    // Creating comment
    await connection.promise().query(INSERT_COMMENT, [id, postId, authorId, content, createdAt]);
    
    // Getting comment
    const comment = await getCommentById(id);

    // Returning comment
    return comment;
}
// Destroying post comment
export const destroyComment: (commentId: string) => Promise<void> = async (commentId) => {
    await connection.promise().query(DELETE_COMMENT, [commentId]);
    return;
}
// Getting post comments
export const getCommentsByParentId: (postId: string) => Promise<Comment[]> = async (postId) => {
    // Fetching comments
    const [comments] = await connection.promise().query<Comment[]>(SELECT_COMMENTS_BY_PARENT_ID, [postId]);
    
    // Returning comments
    return comments;
}
// Getting post comment count
export const getCommentCountByPostId: (postId: string) => Promise<number> = async (postId) => {
    // Getting comment count of post
    const [rows] = await connection.promise().query<any>(SELECT_COMMENT_COUNT_BY_PARENT_ID, [postId]);
    if(!rows[0]) return 0;
    
    // Returning count
    return rows[0].commentCount;
}
// Getting media by ID
export const getMediaById: (id: string) => Promise<Media> = async (id) => {
    // Getting media
    const [media] = await connection.promise().query<Media[]>(SELECT_MEDIA_BY_ID, [id]);
    
    // Returning media
    return media[0];
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
    const newMedia = [];
    for(const mediaItem of media) {
        const { createReadStream } = await mediaItem;
        const id = await generateMediaId();

        // Inserting media into media folder
        await new Promise(res =>
            createReadStream()
                .pipe(createWriteStream(path.join(__dirname, '../imgs/media', `${id}.png`)))
                .on('close', res)
        );

        // Getting image dimensions
        const dimensions = await sizeOf(`imgs/media/${id}.png`);

        // Determining ratios
        let width, height, ratio;
        if(dimensions) {
            width = dimensions.width;
            height = dimensions.height;
            if(width && height) {
                ratio = width / height;
            }
        }

        // Inserting media into database
        await connection.promise().query(INSERT_MEDIA, [id, parentId, width, height, ratio]);
        
        // Getting media
        const newMediaItem = await getMediaById(id);

        // Pushing media
        newMedia.push(newMediaItem);
    }

    // Returning created media
    return newMedia;
}