import { ADD_ACTIVE_POST_LIKE, ADD_COMMENT, REMOVE_ACTIVE_POST_LIKE, RESET_COMMENTS, SET_COMMENTS, SET_POST } from "../actionTypes"

const initialState: any = {
    loading: true
}

export default (state=initialState, action) => {
    switch(action.type) {
        case SET_POST: {
            return {
                ...state,
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
        case RESET_COMMENTS: {
            return {
                ...state,
                comments: null
            }
        }
        case ADD_COMMENT: {
            const comment = action.payload.comment;
            const parentId = comment.parentId;
            let newComments = [...state.comments];

            // If new comment is reply, add to reply array of parent
            const reply = state.comments.map(comment => comment.id).find(id => id === parentId);
            if(reply) {
                for(const c of newComments) {
                    if(c.id === reply) {
                        c.replies.push(comment);
                    }
                }
            } else {
                // Else push comment to post comments
                newComments.push(comment);
            }
            return {
                ...state,
                comments: newComments,
                commentCount: state.commentCount + 1
            }
        }
        default:
            return state;
    }
}