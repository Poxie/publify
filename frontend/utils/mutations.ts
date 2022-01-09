import { gql } from "graphql-request";

export const CREATE_POST = gql`
    mutation($content: String!, $media: [Upload]) {
        createPost(content: $content, media: $media) {
            id
            content
            likes
            likeCount
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