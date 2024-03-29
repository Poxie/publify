import { createWriteStream, existsSync, readFile } from 'fs';
import path from 'path';
import { connection } from "../server"
import { Post as PostType } from "../types/Post"
import { CustomAbout as CustomAboutType, UserType } from "../types/UserType"
import { Media as MediaType } from "../types/Media";
import { DatabaseUser } from "../types/DatabaseUser";
import { Comment as CommentType, Follow as FollowType, Like as LikeType, Notification as NotificationType } from "../types";
import { 
    DELETE_COMMENT,
    DELETE_CUSTOM_ABOUT,
    DELETE_FOLLOW,
    DELETE_LIKE, 
    DELETE_POST, 
    GET_CUSTOM_ABOUT_BY_ID, 
    INSERT_COMMENT, 
    INSERT_CUSTOM_ABOUT, 
    INSERT_FOLLOW, 
    INSERT_LIKE, 
    INSERT_MEDIA, 
    INSERT_NOTIFICATION, 
    INSERT_POST, 
    INSERT_USER, 
    SELECT_COMMENTS_BY_PARENT_ID, 
    SELECT_COMMENT_BY_ID, 
    SELECT_COMMENT_COUNT_BY_PARENT_ID, 
    SELECT_CUSTOM_ABOUTS, 
    SELECT_FOLLOWER, 
    SELECT_FOLLOWERS_COUNT, 
    SELECT_FOLLOWERS_IDS, 
    SELECT_LIKES_BT_PARENT_ID, 
    SELECT_LIKE_BY_ID, 
    SELECT_LIKE_USERS, 
    SELECT_MEDIA_BY_AUTHOR_ID, 
    SELECT_MEDIA_BY_ID, 
    SELECT_MEDIA_BY_POST_ID, 
    SELECT_MOST_FOLLOWERS, 
    SELECT_MOST_LIKES, 
    SELECT_NOTIFICATION, 
    SELECT_POSTS_BY_AUTHOR_ID, 
    SELECT_POST_BY_ID, 
    SELECT_POST_COUNT, 
    SELECT_USER_BY_ID, 
    SELECT_USER_BY_USERNAME, 
    SELECT_USER_NOTIFICATIONS,
    SELECT_USER_NOTIFICATION_COUNT,
    UPDATE_NOTIFICATION_STATUS
} from './queries';
import { RowDataPacket } from 'mysql2';
import imageSize from 'image-size';
import { promisify } from 'util';
import dotenv from 'dotenv';
dotenv.config();
const sizeOf = promisify(imageSize);
const useColors = require('colorthief');
import ejs from 'ejs';
import nodemailer from 'nodemailer';
export const transporter = nodemailer.createTransport({
    service: process.env.EMAILER_SERVICE,
    auth: {
        user: process.env.EMAILER_EMAIL,
        pass: process.env.EMAILER_PASSWORD
    }
})

// MySQL data return types
type User = DatabaseUser & RowDataPacket;
type Post = PostType & RowDataPacket;
type Media = MediaType & RowDataPacket;
type Like = LikeType & RowDataPacket;
type Comment = CommentType & RowDataPacket;
type CustomAbout = CustomAboutType & RowDataPacket;
type Follow = FollowType & RowDataPacket;
type Notification = NotificationType & RowDataPacket;

/**
    ** User ID of the user to check password for
    ** Password that should match password stored in database
**/
export const comparePasswords: (userId: string, password: string) => Promise<boolean> = async (userId, password) => {
    const user = await getUserById(userId);
    if(!user) return false;

    if(user.password === password) {
        return true;
    }
    return false;
}

// Getting custom abouts
export const getCustomAboutsByUserId = async (userId: string) => {
    const [abouts] = await connection.promise().query<CustomAbout[]>(SELECT_CUSTOM_ABOUTS, [userId]);
    return abouts;
}
// Getting user by ID
export const getUserById: (id: string, selfId?: string) => Promise<DatabaseUser> = async (id, selfId) => {
    const [rows] = await connection.promise().query<User[]>(SELECT_USER_BY_ID, [id]);
    const user = rows[0];
    user.customAbouts = await getCustomAboutsByUserId(user.id);
    user.isFollowing = (await getFollow(user.id, selfId)) !== undefined;
    return user;
}
// Getting user by username
export const getUserByUsername: (username: string, selfId?: string) => Promise<DatabaseUser | undefined> = async (username, selfId) => {
    const [rows] = await connection.promise().query<User[]>(SELECT_USER_BY_USERNAME, [username])
    const user = rows[0];
    if(!user) return user;

    user.customAbouts = await getCustomAboutsByUserId(user.id);
    user.isFollowing = (await getFollow(user.id, selfId)) !== undefined;
    return user;
}

// Getting post by ID
export const getPostById: (id: string, userId?: string) => Promise<Post> = async (id, userId) => {
    const [rows] = await connection.promise().query<Post[]>(SELECT_POST_BY_ID, [id]);
    const post = rows[0];
    if(!post) return post;

    // Fetching likes
    post.likes = await getLikesByParentId(id);
    post.likeCount = post.likes.length;

    // Determining if post has been liked by user
    post.isLiked = false;
    if(userId) {
        const like = await getLike(userId, id);
        if(like) {
            post.isLiked = true;
        }
    }

    // Fetching comments
    post.commentCount = await getCommentCountByPostId(id);

    // Fetching media
    post.media = await getMediaByPostId(id);

    // Returning post
    return post;
}

// Getting posts by author ID
export const getPostsByAuthorId: (id: string, startIndex?: number, endIndex?: number, selfId?: string) => Promise<Post[]> = async (authorId, startIndex=0, endIndex=3, selfId) => {
    const [posts] = await connection.promise().query<Post[]>(SELECT_POSTS_BY_AUTHOR_ID, [authorId, startIndex, endIndex])
    
    // If no posts found, return empty array
    if(!posts.length) return [];

    // Fetching extra properties
    for(const post of posts) {
        // Fetch likes
        post.likes = await getLikesByParentId(post.id);
        post.likeCount = post.likes.length;
        post.isLiked = (await getLike(selfId || '', post.id)) !== undefined;

        // Fetch comments
        post.commentCount = await getCommentCountByPostId(post.id);

        // Fetching media
        post.media = await getMediaByPostId(post.id);
    }

    // Return posts
    return posts;
}
export const getPostCount: (userId: string) => Promise<number> = async (userId) => {
    const [rows]: any = await connection.promise().query(SELECT_POST_COUNT, [userId]);
    return rows[0].postCount;
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

// Get like by IDs
export const getLike: (userId: string, parentId: string) => Promise<Like> = async (userId, parentId) => {
    const [likes] = await connection.promise().query<Like[]>(SELECT_LIKE_BY_ID, [userId, parentId]);
    return likes[0];
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
type PartialUser = {
    id: string;
    username: string;
    displayName: string;
    bio?: string;
    avatar?: string;
    banner?: string;
}
export const insertUser: (password: string, {}: PartialUser) => Promise<UserType> = async (password, { id, username, displayName, avatar, banner }) => {
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

    // Notifiying users following
    notifyUsers('post', post.id);

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
export const createMedia: (parentId: string, media: any, authorId: string) => Promise<Media[]> = async (parentId, media, authorId) => {
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
        await connection.promise().query(INSERT_MEDIA, [id, parentId, authorId, width, height, ratio]);
        
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
    value: string | number | boolean;
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

export const getFollowersIds: (userId: string) => Promise<string[]> = async (userId) => {
    const [rows] = await connection.promise().query<any>(SELECT_FOLLOWERS_IDS, [userId]);
    const ids = rows.map((row: any) => row.followerId);
    return ids;
}
export const getFollowersCount: (userId: string) => Promise<number> = async (userId) => {
    const [rows]: any = await connection.promise().query(SELECT_FOLLOWERS_COUNT, [userId]);
    return rows[0].followersCount;
}
export const getFollow: (userId: string, selfId?: string) => Promise<Follow | undefined> = async (userId, selfId) => {
    const [followers] = await connection.promise().query<Follow[]>(SELECT_FOLLOWER, [userId, selfId]);
    return followers[0];
}
export const createFollow: (userId: string, selfId: string) => Promise<boolean> = async (userId, selfId) => {
    await connection.promise().query(INSERT_FOLLOW, [userId, selfId, JSON.stringify(Date.now())]);
    return true;
}
export const destroyFollow: (userId: string, selfId: string) => Promise<boolean> = async (userId, selfId) => {
    await connection.promise().query(DELETE_FOLLOW, [userId, selfId]);
    return true;
}

// Notifications
const generateNotificationId: () => Promise<string> = async () => {
    const id = randomId();
    
    // Checking if exists
    const notif = await getNotification(id);
    if(notif) return await generateNotificationId();

    return id;
}
export const getNotification: (id: string) => Promise<Notification> = async (id) => {
    const [notifications] = await connection.promise().query<Notification[]>(SELECT_NOTIFICATION, [id]);
    return notifications[0];
}
export const getUserNotifications: (id: string, startIndex?: number, endIndex?: number) => Promise<Notification[]> = async (id, startIndex=0, endIndex=8) => {
    const count = endIndex - startIndex;
    const [notifications] = await connection.promise().query<Notification[]>(SELECT_USER_NOTIFICATIONS, [id, startIndex, count]);
    return notifications;
}
export const getUserNotificationCount: (id: string) => Promise<number> = async (id) => {
    const [rows] = await connection.promise().query<any>(SELECT_USER_NOTIFICATION_COUNT, [id]);
    return rows[0].notificationCount;
}
type PartialNotification = {
    userId: string;
    authorId: string;
    type: string;
    content: string;
    image: string | null;
    targetId?: string;
}
type EmailNotification = {
    email: string;
    content: string;
    authorId: string;
    type: string;
    targetId?: string;
}
export const sendEmailNotification: (props: EmailNotification) => Promise<void> = async ({ email, content, authorId, type, targetId }) => {
    const author = await getUserById(authorId);
    const subject = `${author.displayName} published a new post`;

    const options = {
        from: process.env.EMAILER_EMAIL,
        to: email,
        subject,
        html: (await ejs.renderFile(path.join(__dirname, '../templates/newPostTemplate.ejs'), { postId: targetId, author: author.displayName, avatar: author.avatar, authorId: author.id, content }))
    }
    transporter.sendMail(options).catch(console.error);
}
export const createNotification: (notification: PartialNotification) => Promise<Notification> = async ({ type, userId, authorId, content, image, targetId }) => {
    const id = await generateNotificationId();
    const createdAt = Date.now();

    // Fetching user
    const user = await getUserById(userId);
    if(user.email && user.emailNotifications && user.emailVerified) {
        sendEmailNotification({
            email: user.email,
            content: content,
            authorId,
            targetId,
            type
        })
    }

    await connection.promise().query(INSERT_NOTIFICATION, [id, userId, authorId, type, content, createdAt, image, targetId]);
    const notification = await getNotification(id);
    return notification;
}
export const readUserNotifications: (userId: string) => Promise<boolean> = async (userId: string) => {
    await connection.promise().query(UPDATE_NOTIFICATION_STATUS, [1, userId]);
    return true;
}

export const notifyUsers: (type: 'post', targetId: string) => Promise<void> = async (type, targetId) => {
    if(type === 'post') {
        const post = await getPostById(targetId);
        const authorId = post.authorId;
        const followersIds = await getFollowersIds(authorId);
        
        for(const followerId of followersIds) {
            await createNotification({
                type: 'post',
                content: post.content,
                userId: followerId,
                authorId: authorId,
                image: post.media[0]?.id || null,
                targetId: post.id
            })
        }
    }
}

// Feed
export const getUserFeed: (id: string, startIndex?: number, endIndex?: number) => Promise<Post[]> = async (id, startIndex, endIndex) => {
    // Fetching user notifications
    const notifications = await getUserNotifications(id, startIndex, endIndex);

    // Getting posts from notifications
    const posts: Post[] = [];
    for(const notification of notifications) {
        // If notification is not post, continue loop
        if(notification.type !== 'post' || !notification.targetId) continue;

        // Else fetch post and push to posts array
        const post = await getPostById(notification.targetId, id);
        posts.push(post);
    }
    return posts;
}

export const getExploreUsers: () => Promise<UserType[]> = async () => {
    // Fetching user IDs for the users with the most followers
    const [followedUsers] = await connection.promise().query<({userId: string, magnitude: number} & RowDataPacket)[]>(SELECT_MOST_FOLLOWERS);
    const userIds = followedUsers.map(user => user.userId);

    // Fetching user data
    const users = [];
    for(const userId of userIds) {
        const user = await getUserById(userId);
        users.push(user);
    }

    // Returning fethed users
    return users;
}
export const getExplorePosts: (selfId?: string) => Promise<PostType[]> = async (selfId) => {
    // Fetching post IDs for the posts with the most likes
    const [likedPosts] = await connection.promise().query<({parentId: string, magnitude: number} & RowDataPacket)[]>(SELECT_MOST_LIKES);
    const postIds = likedPosts.map(post => post.parentId);

    // Fetching post data
    const posts = [];
    for(const postId of postIds) {
        const post = await getPostById(postId, selfId);
        posts.push(post);
    }

    // Returning fetched posts
    return posts;
}

export const getAutoCompletedUsers: (query: string) => Promise<UserType[]> = async (query) => {
    query = `%${query}%`;
    const [users] = await connection.promise().query<User[]>(SELECT_LIKE_USERS, [query, query]);
    return users;
}