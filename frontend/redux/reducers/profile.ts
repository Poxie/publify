import { AnyAction } from "redux";
import { Media, PostType, UserType } from "../../utils/types";
import { ADD_POST_LIKE, CREATE_FOLLOW, CREATE_POST, DESTROY_FOLLOW, LOAD_MORE_POSTS, REMOVE_POST, REMOVE_POST_LIKE, SET_POSTS, SET_PREVIEW_IMAGES, SET_PROFILE, SET_PROFILE_IMAGES } from "../actionTypes"

const initialState: {
    posts: PostType[];
    user: UserType,
    loading: boolean;
    images: null | Media[];
    previewImages: null | Media[];
    ssr: boolean;
} = {
    posts: [],
    loading: true,
    user: null,
    images: null,
    previewImages: null,
    ssr: true
}

export default (state=initialState, action: AnyAction) => {
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
            const { user, ssr, override } = action.payload;
            return {
                ...(override ? initialState : state),
                user,
                ssr
            }
        }
        case SET_PROFILE_IMAGES: {
            const { images } = action.payload;
            return {
                ...state,
                images
            }
        }
        case SET_PREVIEW_IMAGES: {
            const { images } = action.payload;
            return {
                ...state,
                previewImages: images
            }
        }
        case CREATE_FOLLOW: {
            const user = {...state.user, ...{isFollowing: true, followersCount: state.user.followersCount + 1}};
            return {
                ...state,
                user
            }
        }
        case DESTROY_FOLLOW: {
            const user = {...state.user, ...{isFollowing: false, followersCount: state.user.followersCount - 1}};
            return {
                ...state,
                user
            }
        }
        default:
            return state;
    }
}