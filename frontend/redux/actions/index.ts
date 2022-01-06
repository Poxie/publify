import { getPostsByAuthorId } from "../../utils"
import { ADD_POST_LIKE, SET_POSTS } from "../actionTypes"

export const addPostLike = (postId: string, userId: string) => ({
    type: ADD_POST_LIKE,
    payload: {
        postId,
        userId
    }
})

export const fetchUserPosts = (userId: string) => {
    return async dispatch => {
        const posts = await getPostsByAuthorId(userId);

        dispatch({
            type: SET_POSTS,
            payload: { posts }
        })
    }
}