import { createtPostLike, destroyPost, createPost, destroyPostLike, generateUserId, getPostById, getUserById, insertUser, createComment, destroyComment, getCommentById, createMedia } from "../logic/db-actions";
import { DatabaseUser } from "../types/DatabaseUser";

export const Mutation = {
    register: async (parent: any, args: any) => {
        const { username, displayName, password, avatar, banner }: DatabaseUser = args;
        
        // Generating user ID
        const id = await generateUserId();

        // Inserting user
        const user = await insertUser(password, { id, username, displayName, avatar, banner });
        return user;
    },
    createLike: async (parent: any, args: any, context: any) => {
        const { postId } = args;
        const { userId } = context;
        if(!userId) throw new Error('Unauthorized.');

        // Checking if user exists
        const user = await getUserById(userId);
        if(!user) throw new Error('Unauthorized.');

        // Checking if post exists
        const post = await getPostById(postId);
        if(!post) throw new Error('Post does not exist.');

        // Checking if user has already liked post
        if(post.likes.includes(userId)) throw new Error('User has already liked this post.');

        // Appending userId to liked posts
        await createtPostLike(postId, userId);

        return post;
    },
    destroyLike: async (parent: any, args: any, context: any) => {
        const { postId } = args;
        const { userId } = context;
        if(!userId) throw new Error('Unauthorized.');

        // Checking if user exists
        const user = await getUserById(userId);
        if(!user) return new Error('Unauthorized.');

        // Checking if post exists
        const post = await getPostById(postId);
        if(!post) throw new Error('Post does not exist.');

        // Checking if user has liked post
        if(!post.likes.includes(userId)) throw new Error('User has not liked this post.');

        // Deleting like
        await destroyPostLike(postId, userId);

        return post;
    },
    destroyPost: async (parent: any, args: any, context: any) => {
        const { postId } = args;
        const { userId } = context;
        if(!userId) throw new Error('Unauthorized.');

        // Checking if user exists
        const user = await getUserById(userId);
        if(!user) return new Error('Unauthorized');

        // Checking if post exists
        const post = await getPostById(postId);
        if(!post) throw new Error('Post does not exist.');

        // Deleting post
        const response = await destroyPost(postId);

        return response;
    },
    createPost: async (parent: any, args: any, context: any) => {
        const { content, media } = args;
        const { userId } = context;
        if(!userId) throw new Error('Unauthorized.');

        // Checking if user exists
        const user = await getUserById(userId);
        if(!user) throw new Error('Unauthorized.');

        
        // Creating post
        const post = await createPost(userId, content);
        
        // If uploaded media, insert media
        if(media) {
            // Creating media
            await createMedia(post.id, media);
        }
        
        return post;
    },
    createComment: async (parent: any, args: any, context: any) => {
        const { postId, content } = args;
        const { userId } = context;
        if(!userId) throw new Error('Unauthorized.');

        // Checking if user exists
        const user = await getUserById(userId);
        if(!user) throw new Error('Unauthorized.');

        // Checking if post exists
        const post = await getPostById(postId);
        if(!post) throw new Error('Post does not exist.');

        // Creating commend
        const comment = await createComment(postId, userId, content);

        return comment;
    },
    destroyComment: async (parent: any, args: any, context: any) => {
        const { id } = args;
        const { userId } = context;
        if(!userId) throw new Error('Unauthorized.');

        // Checking if user exists
        const user = await getUserById(userId);
        if(!user) throw new Error('Unauthorized.');

        // Checking if comment exists
        const comment = await getCommentById(id);
        if(!comment) throw new Error('Comment does not exist.');

        // Destroying comment
        await destroyComment(id);

        return true;
    }
}