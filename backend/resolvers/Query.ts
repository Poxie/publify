import { getCommentsByParentId, getMediaByAuthorId, getPostById, getPostsByAuthorId, getUserById, getUserByUsername, getUserNotificationCount, getUserNotifications } from "../logic/db-actions";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "../types/AuthRequest";

export const Query = {
    getMe: async (parent: any, args: any, context: any) => {
        const { userId } = context;
        if(!userId) return;

        const user = await getUserById(userId);
        return user;
    },
    getUserByUsername: async (parent: any, args: any, context: any) => {
        const { username } = args;
        const user = await getUserByUsername(username, context.userId);
        return user;
    },
    getUserById: async (parent: any, args: any, context: any) => {
        const userId = args.id;
        const user = await getUserById(userId, context.userId);
        return user;
    },
    getPostById: async (parent: any, args: any) => {
        const id = args.id;
        const post = await getPostById(id);
        return post;
    },
    getPostsByAuthorId: async (parent: any, args: any, context: any) => {
        const { id: authorId, startIndex, endIndex } = args;
        const posts = await getPostsByAuthorId(authorId, startIndex, endIndex);
        return posts;
    },
    getCommentsByParentId: async (parent: any, args: any) => {
        const parentId = args.parentId;
        const comments = await getCommentsByParentId(parentId);
        return comments;
    },
    getUserMedia: async (parent: any, args: any) => {
        const id = args.id;
        const media = await getMediaByAuthorId(id);
        return media;
    },
    getMyNotificationCount: async (parent: any, args: any, context: any) => {
        const id = context.userId;
        const notificationCount = await getUserNotificationCount(id);
        return notificationCount;
    },
    getMyNotifications: async (parent: any, args: any, context: any) => {
        const id = context.userId;
        const notifications = await getUserNotifications(id);
        return notifications;
    },
    login: async (parent: any, args: any, req: AuthRequest) => {
        const { username, password } = args;
        
        // Checking if user exists
        const user = await getUserByUsername(username);
        if(!user) {
            throw new Error('Incorrect credentials.');
        }

        // Checking if passwords match
        // Remember to hash passwords and match hashed passwords
        const isEqual = user.password === password;
        if(!isEqual) {
            throw new Error('Incorrect credentials.');
        }

        // Signing in, creating token
        const token = jwt.sign({ userId: user.id }, process.env.JSON_WEB_TOKEN_SECRET_KEY || '', {
            expiresIn: '12h'
        })

        return { token, user };
    }
}