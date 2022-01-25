import { createtPostLike, destroyPost, createPost, destroyPostLike, generateUserId, getPostById, getUserById, insertUser, createComment, destroyComment, getCommentById, createMedia, updateProfileProperties, saveUserImage, getDominantColor, updateCustomAbout, insertCustomAbout, destroyCustomAbout, createFollow, getFollow } from "../logic/db-actions";
import { Comment, Like } from "../types";
import { DatabaseUser } from "../types/DatabaseUser";
import { Post } from "../types/Post";
import { UserType } from "../types/UserType";

// Checking authorization
const checkUserExistence: (context: any) => Promise<UserType> = async (context) => {
    const { userId } = context;

    // If userId not present
    if(!userId) throw new Error('Unauthorized');

    // If userId present, but user does not exist
    const user = await getUserById(userId);
    if(!user) throw new Error('Unauthorized');

    return user;
}
// Checking extra permissions
const hasPermissions: (user: UserType, auth: Post | Comment) => boolean = (user, auth) => {
    let authorId = auth.authorId;

    // If author does not match logged in user
    if(authorId !== user.id) throw new Error('Unauthorized');
    
    return true;
}

export const Mutation = {
    register: async (parent: any, args: any) => {
        const { username, displayName, password, bio, avatar, banner }: DatabaseUser = args;
        
        // Generating user ID
        const id = await generateUserId();

        // Inserting user
        const user = await insertUser(password, { id, username, bio, displayName, avatar, banner });
        return user;
    },
    createLike: async (parent: any, args: any, context: any) => {
        const { parentId } = args;
        const user = await checkUserExistence(context);

        // Checking if post exists
        const post = await getPostById(parentId) || await getCommentById(parentId);
        if(!post) throw new Error('Post does not exist.');

        // Checking if user has already liked post
        if(post.likes.includes(user.id)) throw new Error('User has already liked this post.');

        // Appending userId to liked posts
        await createtPostLike(parentId, user.id);

        return post;
    },
    destroyLike: async (parent: any, args: any, context: any) => {
        const { parentId } = args;
        const user = await checkUserExistence(context);

        // Checking if post exists
        const post = await getPostById(parentId) || await getCommentById(parentId);
        if(!post) throw new Error('Post does not exist.');

        // Checking if user has liked post
        if(!post.likes.includes(user.id)) throw new Error('User has not liked this post.');

        // Deleting like
        await destroyPostLike(parentId, user.id);

        return post;
    },
    destroyPost: async (parent: any, args: any, context: any) => {
        const { postId } = args;
        const user = await checkUserExistence(context);

        // Checking if post exists
        const post = await getPostById(postId);
        if(!post) throw new Error('Post does not exist.');

        // Checking if user is allowed to delete post
        hasPermissions(user, post);

        // Deleting post
        const response = await destroyPost(postId);

        return response;
    },
    createPost: async (parent: any, args: any, context: any) => {
        const { content, media } = args;
        const user = await checkUserExistence(context);

        // Creating post
        const post = await createPost(user.id, content);
        
        // If uploaded media, insert media
        if(media && media.length) {
            // Creating media
            await createMedia(post.id, media);
        }
        
        return post;
    },
    createComment: async (parent: any, args: any, context: any) => {
        const { parentId, content } = args;
        const user = await checkUserExistence(context);

        // Checking if post exists
        const post = await getPostById(parentId) || await getCommentById(parentId);
        if(!post) throw new Error('Post does not exist.');

        // Creating commend
        const comment = await createComment(parentId, user.id, content);

        return comment;
    },
    destroyComment: async (parent: any, args: any, context: any) => {
        const { id } = args;
        const user = await checkUserExistence(context);

        // Checking if comment exists
        const comment = await getCommentById(id);
        if(!comment) throw new Error('Comment does not exist.');

        // Checking if user is allowed to delete comment
        hasPermissions(user, comment);

        // Destroying comment
        await destroyComment(id);

        return true;
    },
    updateProfile: async (parent: any, args: any, context: any) => {
        const user = await checkUserExistence(context);

        // Defining what properties to update
        const propertiesToUpdate = [];

        // Looping through existing keys in args
        for(const key of Object.keys(args)) {
            // Getting value of property
            let value = args[key];
            if(!value) value = null;

            // If value is media, upload media and replace value
            if(['avatar', 'banner'].includes(key)) {
                // Saving user image
                const imageId = await saveUserImage(value, key as 'avatar' | 'banner');

                // If is avatar, save dominant color
                if(key === 'avatar') {
                    const color = await getDominantColor(`../imgs/avatars/${imageId}.png`).catch(console.error);
                    console.log(imageId, color)

                    // Pushing color as one of the properties to update
                    if(color) {
                        propertiesToUpdate.push({ key: 'color', value: color });
                    }
                }

                value = imageId;
            }

            // Else append to proprties to add
            propertiesToUpdate.push({ key, value });
        }

        // Updating user profile properties
        const newUser = await updateProfileProperties(user.id, propertiesToUpdate);
        return newUser;
    },
    updateCustomAbout: async (parent: any, args: any, context: any) => {
        const user = await checkUserExistence(context);

        // Defining what properties to update
        const propertiesToUpdate = [];

        // Looping through existing keys in args
        for(const key of Object.keys(args)) {
            if(key === 'id') continue;
            // Getting value of property
            let value = args[key];

            // Else append to proprties to add
            propertiesToUpdate.push({ key, value });
        }

        await updateCustomAbout(args.id, propertiesToUpdate);
        return true;
    },
    createCustomAbout: async (parent: any, args: any, context: any) => {
        const user = await checkUserExistence(context);
        args.userId = user.id;

        const customAbout = await insertCustomAbout(args);
        return customAbout;
    },
    destroyCustomAbout: async (parent: any, args: any, context: any) => {
        const user = await checkUserExistence(context);
        const id = args.id;

        await destroyCustomAbout(id);
        return true;
    },
    createFollow: async (parent: any, args: any, context: any) => {
        const self = await checkUserExistence(context);
        const userId = args.userId;

        // Checking if follow exists
        const follow = await getFollow(userId, self.id);
        if(follow) throw new Error('User is already following.');

        // Create follow
        await createFollow(userId, self.id);
        return true;
    }
}