import { createSelector } from "reselect";
import { Comment, Media, PostType, UserType } from "../utils/types";
import { RootState } from "./store";

type LoadingPost = PostType & {
    loading: boolean;
}

// Selecting active post data
export const selectActivePost: (state: RootState) => LoadingPost = (state) => state.post;
export const selectActivePostMedia: (state: RootState) => Media[] = state => state.post.media;
export const selectActivePostId: (state: RootState) => string = state => state.post.id;
export const selectActivePostDate: (state: RootState) => string = state => state.post.createdAt;
export const selectActivePostAuthor: (state: RootState) => UserType = state => state.post.author;
export const selectActivePostContent: (state: RootState) => string = state => state.post.content;

export const selectPosts: (state: RootState) => PostType[] = (state) => state.posts.posts;
export const selectPostId: (state: RootState, postId: string) => string = (state, postId) => postId;
export const selectComments: (state: RootState) => Comment[] = (state) => state.post.comments;
export const selectCommentIds: (state: RootState) => string[] | undefined = state => state.post.comments?.map(comment => comment?.id);
export const selectCommentId: (state: RootState, commentId: string) => string = (state, commentId) => commentId;
export const selectReplyId: (statet: RootState, commentId: string, replyId: string) => string = (state, commentId, replyId) => replyId;
export const selectCommentById: (state: RootState, commentId: string) => Comment = createSelector(
    [selectComments, selectCommentId],
    (comments, commentId) => comments.find(comment => comment.id === commentId)
)
export const selectCommentReplies: (state: RootState, commentId: string) => Comment[] = createSelector(
    [selectCommentById],
    (comment) => comment.replies
)
export const selectCommentReplyIds: (state: RootState, commentId: string) => string[] = createSelector(
    [selectCommentReplies],
    (replies) => replies.map(reply => reply.id)
)
export const selectReplyById: (state: RootState, commentId: string, replyId: string) => Comment = createSelector(
    [selectCommentReplies, selectReplyId],
    (replies, replyId) => replies.find(reply => reply.id === replyId)
)
export const selectCommentAuthor: (state: RootState, commentId: string) => UserType = createSelector(
    [selectComments, selectCommentById],
    (comments, comment) => comment.author
)
export const selectReplyAuthor: (state: RootState, commentId: string, replyId: string) => UserType = createSelector(
    [selectReplyById],
    (reply) => reply.author
)
export const selectPostById: (state: RootState, postId: string) => PostType = createSelector(
    [selectPosts, selectPostId],
    (posts, postId) => posts.find(post => post.id === postId) 
)
export const selectPostIds: (state: RootState) => string[] = createSelector(
    [selectPosts],
    (posts) => posts.map(post => post.id)
)
export const selectPostMedia: (state: RootState) => Media[] = createSelector(
    [selectPosts],
    (posts) => {
        let media = [];
        for(const post of posts) {
            media = [...media, ...post.media];
        }
        return media;
    }
)

// Notifications
export const selectNotification = (state: RootState) => state.notifications.notification;
export const selectNotificationStatus = (state: RootState) => state.notifications.notificationStatus;
export const selectNotificationState = (state: RootState) => state.notifications.hasNotification;