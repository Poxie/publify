import { createSelector } from "reselect";
import { Comment, Media, PostType, UserType } from "../utils/types";
import { RootState } from "./store";

type LoadingPost = PostType & {
    loading: boolean;
}
export const selectPosts: (state: RootState) => PostType[] = (state) => state.posts.posts;
export const selectPostId: (state: RootState, postId: string) => string = (state, postId) => postId;
export const selectActivePost: (state: RootState) => LoadingPost = (state) => state.post;
export const selectComments: (state: RootState) => Comment[] = (state) => state.post.comments;
export const selectCommentIds: (state: RootState) => string[] | undefined = state => state.post.comments?.map(comment => comment?.id);
export const selectCommentId: (state: RootState, commentId: string) => string = (state, commentId) => commentId;
export const selectCommentById: (state: RootState, commentId: string) => Comment = createSelector(
    [selectComments, selectCommentId],
    (comments, commentId) => comments.find(comment => comment.id === commentId)
)
export const selectCommentAuthor: (state: RootState, commentId: string) => UserType = createSelector(
    [selectComments, selectCommentById],
    (comments, comment) => comment.author
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