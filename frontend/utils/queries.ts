import { gql } from 'graphql-request';

export const USER_PROPERTIES = `
    id
    username
    displayName
    avatar
    banner
    color
    bio
    followersCount
    isFollowing
    postCount
    location
    education
    relationship
    customAbouts {
        label
        type
        emoji
        value
        userId
        id
    }
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
            authorId
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
            isLiked
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

export const DESTROY_FOLLOW = gql`
    mutation($userId: String!) {
        destroyFollow(userId: $userId)
    }
`
export const CREATE_FOLLOW = gql`
    mutation($userId: String!) {
        createFollow(userId: $userId)
    }
`

export const GET_MY_NOTIFICATION_COUNT = gql`
    query {
        getMyNotificationCount
    }
`

export const GET_MY_NOTIFICATIONS = gql`
    query {
        getMyNotifications {
            id
            type
            image
            author {
                ${USER_PROPERTIES}
            }
            content
            targetId
                createdAt
            read
        }
    }
`

export const READ_MY_NOTIFICATIONS = gql`
    mutation {
        readMyNotifications
    }
`

export const GET_MY_FEED = gql`
    query {
        getMyFeed {
            id
            content
            createdAt
            commentCount
            likeCount
            isLiked
            media {
                id
                width
                height
                ratio
            }
            author {
                ${USER_PROPERTIES}
            }
        }
    }
`

export const GET_EXPLORE_USERS = gql`
    query {
        getExploreUsers {
            ${USER_PROPERTIES}
        }
    }
`

export const GET_EXPLORE_POSTS = gql`
    query {
        getExplorePosts {
            id
            content
            createdAt
            commentCount
            likeCount
            isLiked
            media {
                id
                width
                height
                ratio
            }
            author {
                ${USER_PROPERTIES}
            }
        }
    }
`

export const GET_AUTO_COMPLETED_USERS = gql`
    query($query: String!) {
        getAutoCompletedUsers(query: $query) {
            ${USER_PROPERTIES}
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
            email
            emailVerified
        }
    }
`