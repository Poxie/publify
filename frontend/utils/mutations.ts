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
                width
                height
                ratio
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
    mutation($parentId: String!) {
        destroyLike(parentId: $parentId) {
            content
        }
    }
`

export const CREATE_LIKE = gql`
    mutation($parentId: String!) {
        createLike(parentId: $parentId) {
            content
        }
    }
`

export const CREATE_COMMENT = gql`
    mutation($parentId: String!, $content: String!) {
        createComment(parentId: $parentId, content: $content) {
            id
            content
            createdAt
            parentId
            likes
            likeCount
            author {
                id
                avatar
                username
                displayName
            }
            replies {
                id
                parentId
                content
                createdAt
                author {
                    id
                    avatar
                    username
                    displayName
                }
            }
        }
    }
`

export const DESTROY_COMMENT = gql`
    mutation($id: String!) {
        destroyComment(id: $id)
    }
`