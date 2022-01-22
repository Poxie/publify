import { PostType } from "../../utils/types";
import { ADD_ACTIVE_POST_LIKE, ADD_COMMENT, ADD_COMMENT_LIKE, REMOVE_ACTIVE_POST_LIKE, REMOVE_COMMENT, REMOVE_COMMENT_LIKE, RESET_COMMENTS, SET_COMMENTS, SET_POST } from "../actionTypes"

type PostStateType = PostType & {
    loading: boolean;
}
const initialState: any = {
    loading: true
} as PostStateType;

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
                        c.replies = [...c.replies, ...[comment]];
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
        case REMOVE_COMMENT: {
            const { commentId, replyId } = action.payload;
            let newComments = [...state.comments];

            // If is reply, filter out the reply from commentId
            if(replyId) {
                for(const comment of newComments) {
                    if(comment.id === commentId) {
                        comment.replies = comment.replies.filter(reply => reply.id !== replyId);
                    }
                }
            } else {
                // Else just filter out the comment
                newComments = newComments.filter(comment => comment.id !== commentId);
            }

            return {
                ...state,
                comments: newComments
            }
        }
        case ADD_COMMENT_LIKE: {
            const { userId, commentId, replyId } = action.payload;

            let newComments = [...state.comments];
            for(const comment of newComments) {
                if(comment.id === commentId) {
                    // If comment is a reply
                    if(replyId) {
                        // Creating a new reference for the replies, otherwise it won't update
                        comment.replies = comment.replies.map(reply => {
                            if(reply.id === replyId) {
                                reply.likeCount++;
                                reply.likes.push(userId);
                            }
                            return reply;
                        })
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
                        // Creating a new reference for replies, otherwise it wont re-render
                        comment.replies = comment.replies.filter(reply => {
                            if(reply.id === replyId) {
                                reply.likeCount--;
                                reply.likes = reply.likes.filter(like => like !== userId);
                            }
                            return reply;
                        })
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