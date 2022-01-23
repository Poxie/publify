import { gql } from 'graphql-request';

const USER_PROPERTIES = `
    id
    username
    displayName
    avatar
    banner
    color
    bio
`

export const GET_USER_BY_USERNAME = gql`
    query($username: String!) {
        getUserByUsername(username: $username) {
            ${USER_PROPERTIES}
        }
    }
`

export const GET_USER_BY_ID = gql`
    query($id: String!) {
        getUserById(id: $id) {
            ${USER_PROPERTIES}
        }
    }
`

export const GET_MEDIA_BY_AUTHOR_ID = gql`
    query($id: String!) {
        getUserMedia(id: $id) {
            id
            parentId
            width
            height
            ratio
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
                ${USER_PROPERTIES}
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
                ${USER_PROPERTIES}
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
                ${USER_PROPERTIES}
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
                    banner
                    color
                    bio
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
                ${USER_PROPERTIES}
            }
        }
    }
`
export const GET_ME = gql`
    query {
        getMe {
            ${USER_PROPERTIES}
        }
    }
`