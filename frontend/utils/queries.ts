import { gql } from 'graphql-request';

export const GET_USER_BY_ID = gql`
    query($id: String!) {
        getUserById(id: $id) {
            id
            avatar
            banner
            username
            displayName
        }
    }
`

export const GET_POSTS_BY_AUTHOR_ID = gql`
    query($id: String!, $startIndex: Int, $endIndex: Int) {
        getPostsByAuthorId(id: $id, startIndex: $startIndex, endIndex: $endIndex) {
            id
            content
            likes
            likeCount
            commentCount
            createdAt
            author {
                id
                avatar
                username
                displayName
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

export const GET_POST_BY_ID = gql`
    query($id: String!) {
        getPostById(id: $id) {
            id
            content
            likes
            likeCount
            commentCount
            createdAt
            author {
                id
                avatar
                username
                displayName
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

export const GET_COMMENTS_BY_PARENT_ID = gql`
    query($parentId: String!) {
        getCommentsByParentId(parentId: $parentId) {
            id
            authorId
            content
            parentId
            createdAt
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
                authorId
                content
                parentId
                createdAt
                likes
                likeCount
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

// Auth stuff
export const LOGIN = gql`
    query($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                username
                displayName
                avatar
            }
        }
    }
`
export const GET_ME = gql`
    query {
        getMe {
            displayName
            avatar
            id
            username
        }
    }
`