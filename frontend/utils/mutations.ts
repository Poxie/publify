import { gql } from "graphql-request";

export const CREATE_POST = gql`
    mutation($content: String!, $media: [Upload]) {
        createPost(content: $content, media: $media) {
            id
            content
            likes
            likeCount
            commentCount
            createdAt
            author {
                id
                avatar
                displayName
                username
            }
            media {
                id
                parentId
            }
        }
    }
`

export const DESTROY_POST = gql`
    mutation($postId: String!) {
        destroyPost(postId: $postId)
    }
`

export const DESTROY_LIKE = gql`
    mutation($postId: String!) {
        destroyLike(postId: $postId) {
            content
        }
    }
`

export const CREATE_LIKE = gql`
    mutation($postId: String!) {
        createLike(postId: $postId) {
            content
        }
    }
`