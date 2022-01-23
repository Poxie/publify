import { createComment, createLike, destroyPost, destroyLike, getCommentsByParentId, getPostsByAuthorId, publishPost, destroyComment } from "../../utils"
import { Media, PostType, UserType } from "../../utils/types";
import { ADD_ACTIVE_POST_LIKE, ADD_COMMENT, ADD_COMMENT_LIKE, ADD_POST_LIKE, CREATE_NOTIFICATION, CREATE_POST, DESTROY_NOTIFICATION, LOAD_MORE_POSTS, REMOVE_ACTIVE_POST_LIKE, REMOVE_COMMENT, REMOVE_COMMENT_LIKE, REMOVE_POST, REMOVE_POST_LIKE, RESET_COMMENTS, RESET_NOTIFICATION, SET_COMMENTS, SET_POST, SET_POSTS, SET_PROFILE, SET_PROFILE_IMAGES } from "../actionTypes"

// Profle
export const setProfile = (user: UserType) => ({
    type: SET_PROFILE,
    payload: { user }
})
export const setProfileImages = (images: Media[]) => ({
    type: SET_PROFILE_IMAGES,
    payload: { images }
})

// Posts
export const addPostLike = (postId: string, userId: string) => ({
    type: ADD_POST_LIKE,
    payload: {
        postId,
        userId
    }
})

export const removePostLike = (postId: string, userId: string) => ({
    type: REMOVE_POST_LIKE,
    payload: {
        postId,
        userId
    }
});

export const removePost = (postId: string) => {
    return async dispatch => {
        const response = await destroyPost(postId);

        // Removing post from posts state
        dispatch({
            type: REMOVE_POST,
            payload: {
                postId
            }
        })
        // Dispatching success message
        dispatch(createNotification('Successfully deleted post', 'success'));
    }
}

export const createPost = (content: string, media?: File[]) => {
    return async dispatch => {
        const post = await publishPost(content, media);

        // Adding post to posts state
        dispatch({
            type: CREATE_POST,
            payload: {
                post
            }
        })
        // Dispatching success message
        dispatch(createNotification('Successfully published post', 'success'));
    }
}

export const fetchUserPosts = (userId: string, startIndex?: number, endIndex?: number) => {
    return async dispatch => {
        const posts = await getPostsByAuthorId(userId, startIndex, endIndex);

        dispatch({
            type: SET_POSTS,
            payload: { posts }
        })
    }
}

export const loadMorePosts = (userId: string, startIndex: number, endIndex: number) => {
    return async dispatch => {
        const posts = await getPostsByAuthorId(userId, startIndex, endIndex);

        dispatch({
            type: LOAD_MORE_POSTS,
            payload: { posts }
        })
    }
}


// Notifications
export const createNotification = (notification: string, notificationStatus: 'success' | 'info' | 'error' = 'info') => {
    return dispatch => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                notification,
                notificationStatus
            }
        })
    }
}
export const destroyNotification = () => ({
    type: DESTROY_NOTIFICATION
})
export const resetNotification = () => ({
    type: RESET_NOTIFICATION
})


// Post
export const setPost = (post: PostType) => ({
    type: SET_POST,
    payload: { post }
})
export const addActivePostLike = (postId: string, userId: string) => {
    return async dispatch => {
        await createLike(postId);

        dispatch({
            type: ADD_ACTIVE_POST_LIKE,
            payload: { userId }
        })
    }
}
export const removeActivePostLike = (postId: string, userId: string) => {
    return async dispatch => {
        await destroyLike(postId);

        dispatch({
            type: REMOVE_ACTIVE_POST_LIKE,
            payload: { userId }
        })
    }
}
export const fetchComments = (postId: string) => {
    return async dispatch => {
        const comments = await getCommentsByParentId(postId);

        dispatch({
            type: SET_COMMENTS,
            payload: { comments }
        })
    }
}
export const resetComments = () => ({
    type: RESET_COMMENTS
})
export const addComment = (parentId: string, content: string) => {
    return async dispatch => {
        const comment = await createComment(parentId, content);

        dispatch({
            type: ADD_COMMENT,
            payload: { comment }
        })
    }
}
export const removeComment = (commentId: string, replyId?: string) => {
    return async dispatch => {
        // If is reply, destroy by replyId else commentId
        await destroyComment(replyId || commentId);

        dispatch({
            type: REMOVE_COMMENT,
            payload: { commentId, replyId }
        })

        // Sending success notification 
        dispatch(createNotification('Successfully deleted comment.', 'success'));
    }
}
export const addCommentLike = (userId: string, commentId: string, replyId?: string) => {
    return async dispatch => {
        const comment = replyId ? await createLike(replyId) : await createLike(commentId);

        dispatch({
            type: ADD_COMMENT_LIKE,
            payload: { userId, commentId, replyId }
        })
    }
}
export const removeCommentLike = (userId: string, commentId: string, replyId?: string) => {
    return async dispatch => {
        const comment = replyId ? await destroyLike(replyId) : await destroyLike(commentId);

        dispatch({
            type: REMOVE_COMMENT_LIKE,
            payload: { userId, commentId, replyId }
        })
    }
}