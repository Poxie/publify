import { createPostLike, destroyPost, destroyPostLike, getPostsByAuthorId } from "../../utils"
import { ADD_POST_LIKE, CREATE_NOTIFICATION, DESTROY_NOTIFICATION, REMOVE_POST, REMOVE_POST_LIKE, RESET_NOTIFICATION, SET_POSTS } from "../actionTypes"

export const addPostLike = (postId: string, userId: string) => {
    return async dispatch => {
        console.log(postId);
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
        setTimeout(() => {
            dispatch(destroyNotification());

            setTimeout(() => {
                dispatch(resetNotification());
            }, 400);
        }, 5000);
    }
}

export const fetchUserPosts = (userId: string) => {
    return async dispatch => {
        const posts = await getPostsByAuthorId(userId);

        dispatch({
            type: SET_POSTS,
            payload: { posts }
        })
    }
}


// Notifications
export const createNotification = (notification: string, notificationStatus: 'success' | 'info' | 'error' = 'info', duration: number = 5000) => {
    return dispatch => {
        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                notification,
                notificationStatus
            }
        })

        setTimeout(() => {
            dispatch(destroyNotification());

            setTimeout(() => {
                dispatch(resetNotification());
            }, 400);
        }, duration);
    }
}
export const destroyNotification = () => ({
    type: DESTROY_NOTIFICATION
})
export const resetNotification = () => ({
    type: RESET_NOTIFICATION
})