import { createSelector } from "reselect";
import { RootState } from "./store";

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostId = (state: RootState, postId: string) => postId;
export const selectPostById = createSelector(
    [selectPosts, selectPostId],
    (posts, postId) => posts.find(post => post.id === postId) 
)
export const selectPostIds = createSelector(
    [selectPosts],
    (posts) => posts.map(post => post.id)
)
export const selectPostMedia = createSelector(
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