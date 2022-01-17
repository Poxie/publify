import { createSelector } from "reselect";
import { Comment, Media, PostType, UserType } from "../utils/types";
import { RootState } from "./store";

type LoadingPost = PostType & {
    loading: boolean;
}

// Globals
export const selectId: (state: RootState, id: string) => string = (state, id) => id;

// Selecting profile data
export const selectProfileUser: (state: RootState) => UserType | null = state => state.profile.user;

// Selecting active post data
export const selectActivePost: (state: RootState) => LoadingPost = (state) => state.post;
export const selectActivePostMedia: (state: RootState) => Media[] = state => state.post.media;
export const selectActivePostId: (state: RootState) => string = state => state.post.id;
export const selectActivePostDate: (state: RootState) => string = state => state.post.createdAt;
export const selectActivePostAuthor: (state: RootState) => UserType = state => state.post.author;
export const selectActivePostContent: (state: RootState) => string = state => state.post.content;

// Selecting comment data
export const selectComments: (state: RootState) => Comment[] = (state) => state.post.comments;
export const selectCommentIds: (state: RootState) => string[] = createSelector(
    selectComments,
    (comments) => comments.map(comment => comment.id)
);

const commentById: (state: RootState, commentId: string) => Comment = createSelector(
    [selectComments, selectId],
    (comments, commentId) => comments.find(comment => comment.id === commentId)
)
export const selectCommentById: (state: RootState, commentId: string) => Comment = createSelector(
    [selectComments, selectId],
    (comments, commentId) => comments.find(comment => comment.id === commentId)
)
export const selectCommentAuthor: (state: RootState, commentId: string) => UserType = createSelector(
    [selectCommentById],
    (comment) => comment?.author
)

// Selecting replies
export const selectReplyId: (state: RootState, commentId: string, replyId: string) => string = (_, __, replyId) => replyId;
export const selectReplies: (state: RootState, commentId: string) => Comment[] = createSelector(
    [selectCommentById],
    (comment) => comment?.replies
)
export const selectReplyIds: (state: RootState, commentId: string) => string[] = createSelector(
    [selectReplies],
    (replies) => replies.map(reply => reply.id)
)
export const selectReplyById: (state: RootState, commentId: string, replyId: string) => Comment = createSelector(
    [selectCommentById, selectReplyId],
    (comment, replyId) => comment?.replies?.find(reply => reply.id === replyId)
)
export const selectReplyAuthor: (state: RootState, commentId: string, replyId: string) => UserType = createSelector(
    [selectReplyById],
    (reply) => reply?.author
)

export const selectPosts: (state: RootState) => PostType[] = (state) => state.profile.posts;
export const selectPostId: (state: RootState, postId: string) => string = (state, postId) => postId;
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