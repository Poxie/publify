import { createSelector } from "reselect";
import { Comment, Media, PostType, UserType } from "../utils/types";
import { RootState } from "./store";

type LoadingPost = PostType & {
    loading: boolean;
}

// Globals
export const selectId: (state: RootState, id: string) => string = (state, id) => id;
export const selectReplyId: (state: RootState, commentId: string, replyId: string) => string = (_, __, replyId) => replyId;

// Selecting profile data
export const selectProfileUser: (state: RootState) => UserType | null = state => state.profile.user;
export const selectProfileImages: (state: RootState) => Media[] | null = state => state.profile.images;
export const selectProfilePreview: (state: RootState) => Media[] | null = state => state.profile.previewImages;
export const selectProfileIsSSR: (state: RootState) => boolean = state => state.profile.ssr;

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
export const selectCommentById: (state: RootState, commentId: string, replyId?: string) => Comment | undefined = createSelector(
    [selectComments, selectId, selectReplyId],
    (comments, commentId, replyId) => {
        const comment = comments?.find(comment => comment.id === commentId);
        // If not comment, return
        if(!comment) return;

        // If comment is not reply, return comment
        if(!replyId) return comment;

        // Else fetch reply comment
        const reply = comment.replies.find(reply => reply.id === replyId);
        return reply;
    }
)
export const selectCommentAuthor: (state: RootState, commentId: string, replyId?: string) => UserType = createSelector(
    [selectCommentById],
    (comment) => comment?.author
)
export const selectReplies: (state: RootState, commentId: string) => Comment[] = createSelector(
    [selectCommentById],
    (comment) => comment.replies
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

// Explore
export const selectPopularUsers: (state: RootState) => UserType[] = state => state.explore.popularUsers;
export const selectPopularPosts: (state: RootState) => PostType[] = state => state.explore.popularPosts;

// Users
export const selectCachedUsers: (state: RootState) => UserType[] = state => state.users;
export const selectCachedUser: (state: RootState, userId: string) => UserType | undefined = createSelector(
    [selectCachedUsers, selectId],
    (users, userId) => users.find(user => user.id === userId)
);

// Notifications
export const selectNotification = (state: RootState) => state.notifications.notification;
export const selectNotificationStatus = (state: RootState) => state.notifications.notificationStatus;
export const selectNotificationState = (state: RootState) => state.notifications.hasNotification;