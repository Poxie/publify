import { PostType, UserType } from "../../utils/types";
import { ADD_POST_LIKE, CREATE_POST, LOAD_MORE_POSTS, REMOVE_POST, REMOVE_POST_LIKE, SET_POSTS, SET_PROFILE } from "../actionTypes"

const initialState: {
    posts: PostType[];
    user: UserType,
    loading: boolean;
} = {
    posts: [],
    loading: true,
    user: null
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_POSTS: {
            const { posts } = action.payload;
            
            return {
                ...state,
                posts,
                loading: false
            }
        }
        case LOAD_MORE_POSTS: {
            const { posts } = action.payload;

            return {
                ...state,
                posts: [...state.posts, ...posts]
            }
        }
        case REMOVE_POST_LIKE: {
            const { postId, userId } = action.payload;
            return {
                ...state,
                posts: state.posts.map((post: PostType) => {
                    if(post.id === postId) {
                        post.likes = post.likes.filter(like => like !== userId);
                        post.likeCount--;
                    }
                    return post;
                })
            }
        }
        case ADD_POST_LIKE: {
            const { postId, userId } = action.payload;
            return {
                ...state,
                posts: state.posts.map((post: PostType) => {
                    if(post.id === postId) {
                        post.likes.push(userId);
                        post.likeCount++;
                    }
                    return post;
                })
            }
        }
        case REMOVE_POST: {
            const { postId } = action.payload;
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== postId)
            }
        }
        case CREATE_POST: {
            const { post } = action.payload;
            return {
                ...state,
                posts: [...[post], ...state.posts]
            }
        }
        case SET_PROFILE: {
            const { user } = action.payload;
            return {
                ...state,
                user
            }
        }
        default:
            return state;
    }
}