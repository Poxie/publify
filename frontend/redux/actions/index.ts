import { createPostLike, destroyPostLike, getPostsByAuthorId } from "../../utils"
import { ADD_POST_LIKE, REMOVE_POST_LIKE, SET_POSTS } from "../actionTypes"

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

export const fetchUserPosts = (userId: string) => {
    return async dispatch => {
        const posts = await getPostsByAuthorId(userId);

        dispatch({
            type: SET_POSTS,
            payload: { posts }
        })
    }
}