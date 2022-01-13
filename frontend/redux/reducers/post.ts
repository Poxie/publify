import { ADD_ACTIVE_POST_LIKE, ADD_COMMENT, ADD_COMMENT_LIKE, REMOVE_ACTIVE_POST_LIKE, REMOVE_COMMENT_LIKE, RESET_COMMENTS, SET_COMMENTS, SET_POST } from "../actionTypes"

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
        case ADD_COMMENT_LIKE: {
            const { userId, commentId, replyId } = action.payload;

            let newComments = [...state.comments];
            for(const comment of newComments) {
                if(comment.id === commentId) {
                    // If comment is a reply
                    if(replyId) {
                        for(const reply of comment.replies) {
                            if(reply.id === replyId) {
                                reply.likeCount++;
                                reply.likes.push(userId);
                            }
                        }
                    } else {
                        comment.likeCount++;
                        comment.likes.push(userId);
                    }
                }
            }

            return {
                ...state,
                comments: newComments
            }
        }
        case REMOVE_COMMENT_LIKE: {
            const { userId, commentId, replyId } = action.payload;

            let newComments = [...state.comments];
            for(const comment of newComments) {
                if(comment.id === commentId) {
                    // If comment is a reply
                    if(replyId) {
                        for(const reply of comment.replies) {
                            if(reply.id === replyId) {
                                reply.likeCount--;
                                reply.likes = reply.likes.filter(like => like !== userId);
                            }
                        }
                    } else {
                        comment.likeCount--;
                        comment.likes = comment.likes.filter(like => like !== userId);
                    }
                }
            }

            return {
                ...state,
                comments: newComments
            }
        }
        default:
            return state;
    }
}