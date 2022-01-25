import { createWriteStream, existsSync, readFile } from 'fs';
import path from 'path';
import { connection } from "../server"
import { Post as PostType } from "../types/Post"
import { CustomAbout as CustomAboutType, UserType } from "../types/UserType"
import { Media as MediaType } from "../types/Media";
import { DatabaseUser } from "../types/DatabaseUser";
import { Comment as CommentType, Follow as FollowType, Like as LikeType } from "../types";
import { 
    DELETE_COMMENT,
    DELETE_CUSTOM_ABOUT,
    DELETE_LIKE, 
    DELETE_POST, 
    GET_CUSTOM_ABOUT_BY_ID, 
    INSERT_COMMENT, 
    INSERT_CUSTOM_ABOUT, 
    INSERT_FOLLOW, 
    INSERT_LIKE, 
    INSERT_MEDIA, 
    INSERT_POST, 
    INSERT_USER, 
    SELECT_COMMENTS_BY_PARENT_ID, 
    SELECT_COMMENT_BY_ID, 
    SELECT_COMMENT_COUNT_BY_PARENT_ID, 
    SELECT_CUSTOM_ABOUTS, 
    SELECT_FOLLOWER, 
    SELECT_LIKES_BT_PARENT_ID, 
    SELECT_MEDIA_BY_AUTHOR_ID, 
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
const useColors = require('colorthief');

// MySQL data return types
type User = DatabaseUser & RowDataPacket;
type Post = PostType & RowDataPacket;
type Media = MediaType & RowDataPacket;
type Like = LikeType & RowDataPacket;
type Comment = CommentType & RowDataPacket;
type CustomAbout = CustomAboutType & RowDataPacket;
type Follow = FollowType & RowDataPacket;

// Getting custom abouts
export const getCustomAboutsByUserId = async (userId: string) => {
    const [abouts] = await connection.promise().query<CustomAbout[]>(SELECT_CUSTOM_ABOUTS, [userId]);
    return abouts;
}
// Getting user by ID
export const getUserById: (id: string) => Promise<DatabaseUser> = async (id) => {
    const [rows] = await connection.promise().query<User[]>(SELECT_USER_BY_ID, [id]);
    const user = rows[0];
    user.customAbouts = await getCustomAboutsByUserId(user.id);
    return user;
}
// Getting user by username
export const getUserByUsername: (username: string) => Promise<DatabaseUser | undefined> = async (username) => {
    const [rows] = await connection.promise().query<User[]>(SELECT_USER_BY_USERNAME, [username])
    const user = rows[0];
    user.customAbouts = await getCustomAboutsByUserId(user.id);
    return user;
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
export const getLikesByParentId: (parentId: string) => Promise<string[]> = async (parentId) => {
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
    const id = randomId();

    const user = await getUserById(id);
    if(user) return await generateUserId();

    return id;
}

const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('');

export const getDominantColor: (imagePath: string) => Promise<string> = async (imagePath) => {
    const rgb = await useColors.getColor(path.join(__dirname, imagePath));
    const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
    return hex;
}
const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
}
// Inserting user
export const insertUser: (password: string, {}: UserType) => Promise<UserType> = async (password, { id, username, displayName, avatar, banner }) => {
    let avatarId, bannerId;
    // Getting user media if exists
    if(avatar) {
        avatarId = await saveUserImage(avatar, 'avatar');
    } else {
        avatarId = `default${getRandomNumber(1,4)}`;
    }
    if(banner) {
        bannerId = await saveUserImage(banner, 'banner');
    }

    // Getting dominant color of avatar
    const color = await getDominantColor(`../imgs/avatars/${avatarId}.png`);

    // Insert user
    const rows = await connection.promise().query(INSERT_USER, [id, username, password, displayName, avatarId, bannerId, color]).catch(console.error).then(rows => rows);

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
    const comment = rows[0];
    
    // Fetching comment likes
    if(comment) {
        comment.likes = await getLikesByParentId(comment.id);
        comment.likeCount = comment.likes.length;
    }

    return comment;
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
    
    // Fetching comment likes
    for(const comment of comments) {
        comment.likes = await getLikesByParentId(comment.id);
        comment.likeCount = comment.likes.length;
    }

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
// Getitng media by authorId
export const getMediaByAuthorId: (authorId: string) => Promise<Media[]> = async (authorId) => {
    const [media] = await connection.promise().query<Media[]>(SELECT_MEDIA_BY_AUTHOR_ID, [authorId]);
    return media;
}

// Saving images
const saveImage = async (file: any, filePath: '../imgs/media' | '../imgs/avatars' | '../imgs/banners', id: string) => {
    // Gettin read stream from file
    const { createReadStream } = await file;

    // Inserting media into media folder
    await new Promise(res =>
        createReadStream()
            .pipe(createWriteStream(path.join(__dirname, filePath, `${id}.png`)))
            .on('close', res)
    );
}

// Creating media
export const createMedia: (parentId: string, media: any) => Promise<Media[]> = async (parentId, media) => {
    const newMedia = [];
    for(const mediaItem of media) {
        // Saving media
        const id = await generateMediaId();
        await saveImage(mediaItem, '../imgs/media', id);

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

// Generating avatar ID
const generateUserImageId: (type: 'avatar' | 'banner') => string = (type) => {
    const id = randomId();

    // Checking if ID already exists
    if(existsSync(`../imgs/${type}s/${id}.png`)) {
        return generateUserImageId(type);
    }

    return id;
}
// Creating user images
export const saveUserImage = async (file: any, type: 'avatar' | 'banner') => {
    const id = generateUserImageId(type);
    // Saving image in designated folder
    await saveImage(file, type === 'avatar' ? '../imgs/avatars' : '../imgs/banners', id);
    return id;
}

// Updating user profile
type Property = {
    key: string;
    value: string;
}
export const updateProfileProperties: (userId: string, properties: Property[]) => Promise<UserType> = async (userId, properties) => {
    let query = `UPDATE users SET `;

    // We can use prop.key here without worrying because prop.key cannot be inputted maliciously thanks to GraphQL
    const options = properties.map(prop => `${prop.key} = ?`).join(' ,');
    query += options;
    query += ` WHERE id = ?`;
    
    // Getting property values from properties
    const propertyValues = properties.map(prop => prop.value);
    await connection.promise().query(query, [...propertyValues, ...[userId]]);

    // Fetching new user
    const user = await getUserById(userId);
    return user;
}
export const updateCustomAbout: (id: string, propertiesToUpdate: Property[]) => Promise<boolean> = async (id, properties) => {
    let query = `UPDATE about SET `;

    // We can use prop.key here without worrying because prop.key cannot be inputted maliciously thanks to GraphQL
    const options = properties.map(prop => `${prop.key} = ?`).join(' ,');
    query += options;
    query += ` WHERE id = ?`;
    
    // Getting property values from properties
    const propertyValues = properties.map(prop => prop.value);
    await connection.promise().query(query, [...propertyValues, ...[id]]);

    return true;
}
type InitialCustomAbout = {
    label: string;
    emoji: string;
    value: string;
    userId: string;
}
type CustomAboutPacket = CustomAbout & RowDataPacket;
const generateAboutId: () => Promise<string> = async () => {
    const id = randomId();

    // Checking if ID exists
    const [about] = await connection.promise().query<CustomAboutPacket[]>(`SELECT * FROM about WHERE id = ?`, [id]);
    if(about.length) return await generateAboutId();

    return id;
}
export const insertCustomAbout: ({ label, emoji, value }: InitialCustomAbout) => Promise<CustomAbout> = async ({ userId, label, emoji, value }) => {
    const id = await generateAboutId();
    await connection.promise().query<CustomAboutPacket[]>(INSERT_CUSTOM_ABOUT, [id, userId, label, value, emoji]);
    const about = await getCustomAboutById(id);
    return about;
}
export const destroyCustomAbout: (id: string) => Promise<boolean> = async (id) => {
    await connection.promise().query(DELETE_CUSTOM_ABOUT, [id]);
    return true;
}
export const getCustomAboutById: (id: string) => Promise<CustomAbout> = async (id) => {
    const [abouts] = await connection.promise().query<CustomAbout[]>(GET_CUSTOM_ABOUT_BY_ID, [id]);
    return abouts[0];
}

export const getFollow: (userId: string, selfId: string) => Promise<Follow | undefined> = async (userId, selfId) => {
    const [followers] = await connection.promise().query<Follow[]>(SELECT_FOLLOWER, [userId, selfId]);
    return followers[0];
}
export const createFollow: (userId: string, selfId: string) => Promise<boolean> = async (userId, selfId) => {
    await connection.promise().query(INSERT_FOLLOW, [userId, selfId, JSON.stringify(Date.now())]);
    return true;
}