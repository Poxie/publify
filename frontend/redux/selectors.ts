import { createSelector } from "reselect";
import { RootState } from "./store";

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostId = (state: RootState, postId: string) => postId;

export const selectPostById = createSelector(
    [selectPosts, selectPostId],
    (posts, postId) => posts.find(post => post.id === postId) 
)