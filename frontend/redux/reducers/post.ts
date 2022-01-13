import { ADD_ACTIVE_POST_LIKE, ADD_COMMENT, REMOVE_ACTIVE_POST_LIKE, SET_COMMENTS, SET_POST } from "../actionTypes"

const initialState: any = {
    loading: true
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_POST: {
            return {
                loading: false,
                ...action.payload.post
            }
        }
        case ADD_ACTIVE_POST_LIKE: {
            return {
                ...state,
                likeCount: state.likeCount + 1,
                likes: [...state.likes, ...[action.payload.userId]]
            }
        }
        case REMOVE_ACTIVE_POST_LIKE: {
            return {
                ...state,
                likeCount: state.likeCount - 1,
                likes: state.likes.filter(like => like !== action.payload.userId)
            }
        }
        case SET_COMMENTS: {
            return {
                ...state,
                comments: action.payload.comments
            }
        }
        case ADD_COMMENT: {
            return {
                ...state,
                comments: [...state.comments, ...[action.payload.comment]],
                commentCount: state.commentCount + 1
            }
        }
        default:
            return state;
    }
}