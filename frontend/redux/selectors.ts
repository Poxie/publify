import { createSelector } from "reselect";
import { Media, PostType } from "../utils/types";
import { RootState } from "./store";

type LoadingPost = PostType & {
    loading: boolean;
}
export const selectPosts: (state: RootState) => PostType[] = (state) => state.posts.posts;
export const selectPostId: (state: RootState, postId: string) => string = (state, postId) => postId;
export const selectActivePost: (state: RootState) => LoadingPost = (state) => state.post;
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