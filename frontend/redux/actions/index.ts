import { createComment, createPostLike, destroyPost, destroyPostLike, getCommentsByPostId, getPostsByAuthorId, publishPost } from "../../utils"
import { PostType } from "../../utils/types";
import { ADD_ACTIVE_POST_LIKE, ADD_COMMENT, ADD_POST_LIKE, CREATE_NOTIFICATION, CREATE_POST, DESTROY_NOTIFICATION, LOAD_MORE_POSTS, REMOVE_ACTIVE_POST_LIKE, REMOVE_POST, REMOVE_POST_LIKE, RESET_COMMENTS, RESET_NOTIFICATION, SET_COMMENTS, SET_POST, SET_POSTS } from "../actionTypes"

export const addPostLike = (postId: string, userId: string) => {
    return async dispatch => {
        const response = await createPostLike(postId);

        dispatch({
            type: ADD_POST_LIKE,
            payload: {
                postId,
                userId
            }
        })
    }
};

export const removePostLike = (postId: string, userId: string) => {
    return async dispatch => {
        const response = await destroyPostLike(postId);

        dispatch({
            type: REMOVE_POST_LIKE,
            payload: {
                postId,
                userId
            }
        });
    }
}

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
        await createPostLike(postId);

        dispatch({
            type: ADD_ACTIVE_POST_LIKE,
            payload: { userId }
        })
    }
}
export const removeActivePostLike = (postId: string, userId: string) => {
    return async dispatch => {
        await destroyPostLike(postId);

        dispatch({
            type: REMOVE_ACTIVE_POST_LIKE,
            payload: { userId }
        })
    }
}
export const fetchComments = (postId: string) => {
    return async dispatch => {
        const comments = await getCommentsByPostId(postId);

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