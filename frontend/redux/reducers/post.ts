import { ADD_ACTIVE_POST_LIKE, REMOVE_ACTIVE_POST_LIKE, SET_POST } from "../actionTypes"

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
        default:
            return state;
    }
}