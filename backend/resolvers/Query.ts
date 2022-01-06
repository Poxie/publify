import { getPostById, getPostsByAuthorId, getUserById, getUserByUsername } from "../logic/db-actions";
import jwt from 'jsonwebtoken';
import { AuthRequest } from "../types/AuthRequest";

export const Query = {
    getUserById: async (parent: any, args: any) => {
        const userId = args.id;
        const user = await getUserById(userId);
        console.log(userId);
        return user;
    },
    getPostById: async (parent: any, args: any) => {
        const id = args.id;
        const post = await getPostById(id);
        return post;
    },
    getPostsByAuthorId: async (parent: any, args: any) => {
        const authorId = args.id;
        const posts = await getPostsByAuthorId(authorId);
        return posts;
    },
    login: async (parent: any, args: any, req: AuthRequest) => {
        const { username, password } = args;
        
        // Checking if user exists
        const user = await getUserByUsername(username);
        if(!user) {
            throw new Error('User not found.');
        }

        // Checking if passwords match
        // Remember to hash passwords and match hashed passwords
        const isEqual = user.password === password;
        if(!isEqual) {
            throw new Error('Password incorrect.');
        }

        // Signing in, creating token
        const token = jwt.sign({ userId: user.id }, process.env.JSON_WEB_TOKEN_SECRET_KEY || '', {
            expiresIn: '12h'
        })

        return { token, user };
    }
}